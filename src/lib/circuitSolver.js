// MNA Circuit Solver for Eletrinoa virtual breadboard
// Solves simple DC circuits: resistors, LEDs, wires on an Ariston breadboard

import { buildBreadboardUF } from './unionFind'
import { gaussianEliminate } from './gaussianEliminate'
import { LED_VF, LED_MAX_I } from '@/data/componentCatalog'
import { holeId, POWER_COL, GROUND_COL } from './breadboard'

const SUPPLY_VOLTAGE = 10 // Mean Well power supply = 10V
const LED_RESISTANCE = 5  // Internal LED resistance (small, for solver stability)

export function solveCircuit(components) {
  if (!components || components.length === 0) {
    return { nets: {}, components: {}, faults: [], valid: false }
  }

  const faults = []

  // 1. Build Union-Find with user wires unioned
  const uf = buildBreadboardUF()
  const wires = components.filter((c) => c.kind === 'wire')
  for (const w of wires) {
    uf.union(w.holeA, w.holeB)
  }

  // 2. Identify power and ground nets
  const powerNet = uf.find(holeId(POWER_COL, 1))
  const groundNet = uf.find(holeId(GROUND_COL, 1))

  // 3. Short-circuit check: power === ground
  if (uf.connected(holeId(POWER_COL, 1), holeId(GROUND_COL, 1))) {
    faults.push({
      kind: 'short_circuit',
      message: '⚡ Cortocircuito: hay un camino directo entre + y − sin resistencia. Esto quemaría los componentes.',
      severity: 'fatal',
      involvedComponents: wires.map((w) => w.id),
    })
    return { nets: {}, components: {}, faults, valid: false }
  }

  // 4. Collect non-wire components (resistors, LEDs) and their net endpoints
  const activeComponents = components.filter((c) => c.kind !== 'wire')
  if (activeComponents.length === 0) {
    return { nets: {}, components: {}, faults: [], valid: false }
  }

  // Map each unique net root to an index
  const netSet = new Set()
  netSet.add(powerNet)
  netSet.add(groundNet)
  for (const comp of activeComponents) {
    netSet.add(uf.find(comp.holeA))
    netSet.add(uf.find(comp.holeB))
  }
  const netList = [...netSet]
  const netIndex = new Map()
  netList.forEach((net, i) => netIndex.set(net, i))

  const groundIdx = netIndex.get(groundNet)
  const powerIdx = netIndex.get(powerNet)
  const n = netList.length

  // 5. Build conductance matrix (MNA)
  // We use ground as reference (voltage = 0) and fix power node = SUPPLY_VOLTAGE
  // Reduced system: eliminate ground node, add voltage source constraint for power

  // Component conductances
  const componentData = activeComponents.map((comp) => {
    const netA = uf.find(comp.holeA)
    const netB = uf.find(comp.holeB)
    const idxA = netIndex.get(netA)
    const idxB = netIndex.get(netB)

    let conductance
    if (comp.kind === 'resistor') {
      conductance = 1 / (comp.value || 1000)
    } else if (comp.kind === 'led') {
      // Model LED as Vf voltage source in series with small resistance
      conductance = 1 / LED_RESISTANCE
    }
    return { comp, idxA, idxB, conductance, netA, netB }
  })

  // Check for open circuits: any component whose both terminals are on the same net
  // (it's shorted by the breadboard wiring itself)
  for (const cd of componentData) {
    if (cd.idxA === cd.idxB) {
      if (cd.comp.kind === 'resistor') {
        faults.push({
          kind: 'short_circuit',
          message: '⚡ La resistencia está cortocircuitada — sus dos patas están en el mismo nodo eléctrico.',
          severity: 'warning',
          involvedComponents: [cd.comp.id],
        })
      }
    }
  }

  // LED-specific fault checks
  const leds = activeComponents.filter((c) => c.kind === 'led')
  const resistors = activeComponents.filter((c) => c.kind === 'resistor')

  for (const led of leds) {
    // Check if LED has a series resistor in any path
    const ledNetA = uf.find(led.holeA)
    const ledNetB = uf.find(led.holeB)
    const hasResistorInPath = resistors.some((r) => {
      const rNetA = uf.find(r.holeA)
      const rNetB = uf.find(r.holeB)
      // Resistor shares a net with the LED
      return rNetA === ledNetA || rNetA === ledNetB ||
             rNetB === ledNetA || rNetB === ledNetB
    })
    if (!hasResistorInPath && leds.length > 0 && resistors.length === 0) {
      faults.push({
        kind: 'led_no_resistor',
        message: '⚠️ El LED no tiene resistencia protectora. Con más de 30mA se quemaría.',
        severity: 'warning',
        involvedComponents: [led.id],
      })
    }
  }

  // 6. Solve the circuit
  // Build G matrix and I vector
  // Ground node is reference (V=0), we solve for all other nodes
  // Power node has fixed voltage = SUPPLY_VOLTAGE

  // Create reduced system: remove ground node
  const nodeCount = n
  const G = Array.from({ length: nodeCount }, () => new Array(nodeCount).fill(0))
  const I = new Array(nodeCount).fill(0)

  for (const cd of componentData) {
    if (cd.idxA === cd.idxB) continue // shorted component

    if (cd.comp.kind === 'resistor') {
      const g = cd.conductance
      G[cd.idxA][cd.idxA] += g
      G[cd.idxB][cd.idxB] += g
      G[cd.idxA][cd.idxB] -= g
      G[cd.idxB][cd.idxA] -= g
    } else if (cd.comp.kind === 'led') {
      // LED modeled as: current source of Vf/R_led in parallel with conductance
      const g = cd.conductance
      G[cd.idxA][cd.idxA] += g
      G[cd.idxB][cd.idxB] += g
      G[cd.idxA][cd.idxB] -= g
      G[cd.idxB][cd.idxA] -= g

      // Current source for LED Vf (anode = holeA, cathode = holeB)
      // Norton: current flows anode→cathode, so inject into anode, extract from cathode
      const vf = LED_VF[cd.comp.ledColor] || 2.0
      const iSource = vf * g
      I[cd.idxA] += iSource
      I[cd.idxB] -= iSource
    }
  }

  // Apply voltage source: V[powerIdx] = SUPPLY_VOLTAGE, V[groundIdx] = 0
  // Set ground row: V[groundIdx] = 0
  for (let j = 0; j < nodeCount; j++) G[groundIdx][j] = 0
  G[groundIdx][groundIdx] = 1
  I[groundIdx] = 0

  // Set power row: V[powerIdx] = SUPPLY_VOLTAGE
  for (let j = 0; j < nodeCount; j++) G[powerIdx][j] = 0
  G[powerIdx][powerIdx] = 1
  I[powerIdx] = SUPPLY_VOLTAGE

  // 7. Gaussian elimination
  const voltages = gaussianEliminate(G, I)

  if (!voltages) {
    faults.push({
      kind: 'open_circuit',
      message: '🔌 Circuito abierto: no hay camino completo entre + y −.',
      severity: 'warning',
      involvedComponents: [],
    })
    return { nets: {}, components: {}, faults, valid: false }
  }

  // 8. Build net voltages
  const nets = {}
  netList.forEach((net, i) => {
    nets[net] = { voltage: voltages[i] || 0 }
  })

  // 9. Compute per-component values
  const compResults = {}
  for (const cd of componentData) {
    const vA = voltages[cd.idxA] || 0
    const vB = voltages[cd.idxB] || 0

    if (cd.comp.kind === 'resistor') {
      const vAcross = Math.abs(vA - vB)
      const current = vAcross / (cd.comp.value || 1000)
      compResults[cd.comp.id] = {
        voltageAcross: vAcross,
        currentThrough: current,
        powerDissipated: vAcross * current,
      }
    } else if (cd.comp.kind === 'led') {
      const vf = LED_VF[cd.comp.ledColor] || 2.0
      const vAcross = vA - vB // anode minus cathode
      const current = (vAcross - vf) / LED_RESISTANCE

      // Check polarity
      if (vAcross < 0) {
        faults.push({
          kind: 'led_reverse',
          message: '🔄 El LED está al revés. La pata larga (ánodo +) debe ir hacia el + de la fuente.',
          severity: 'warning',
          involvedComponents: [cd.comp.id],
        })
      }

      // Check overcurrent
      if (current > LED_MAX_I) {
        faults.push({
          kind: 'led_no_resistor',
          message: `⚠️ Corriente del LED demasiado alta (${(current * 1000).toFixed(0)}mA). Necesita una resistencia protectora.`,
          severity: 'warning',
          involvedComponents: [cd.comp.id],
        })
      }

      const clampedV = Math.max(0, vAcross)
      const clampedI = Math.max(0, current)
      compResults[cd.comp.id] = {
        voltageAcross: clampedV,
        currentThrough: clampedI,
        powerDissipated: clampedV * clampedI,
      }
    }
  }

  return {
    nets,
    components: compResults,
    faults,
    valid: faults.every((f) => f.severity !== 'fatal'),
    supplyVoltage: SUPPLY_VOLTAGE,
  }
}
