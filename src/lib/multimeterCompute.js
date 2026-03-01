// Multimeter reading computations
// Takes a circuit solution and two probe positions, returns a reading

import { buildBreadboardUF } from './unionFind'
import { holeId, POWER_COL, GROUND_COL } from './breadboard'

export function computeReading(mode, probeA, probeB, components, solution) {
  if (!probeA || !probeB || !solution) {
    return { value: null, unit: '', display: '---' }
  }

  // Build UF to find which net each probe is in
  const uf = buildBreadboardUF()
  const wires = components.filter((c) => c.kind === 'wire')
  for (const w of wires) uf.union(w.holeA, w.holeB)

  const netA = uf.find(probeA)
  const netB = uf.find(probeB)

  switch (mode) {
    case 'V': {
      const vA = solution.nets[netA]?.voltage ?? 0
      const vB = solution.nets[netB]?.voltage ?? 0
      const voltage = vA - vB
      return {
        value: voltage,
        unit: 'V',
        display: `${voltage.toFixed(2)} V`,
      }
    }

    case 'A': {
      // Find a component connected between the two probe nets
      const comp = components.find((c) => {
        if (c.kind === 'wire') return false
        const cNetA = uf.find(c.holeA)
        const cNetB = uf.find(c.holeB)
        return (cNetA === netA && cNetB === netB) ||
               (cNetA === netB && cNetB === netA)
      })
      if (!comp || !solution.components[comp.id]) {
        return { value: 0, unit: 'A', display: '0.00 mA' }
      }
      const current = solution.components[comp.id].currentThrough
      if (current >= 1) {
        return { value: current, unit: 'A', display: `${current.toFixed(2)} A` }
      }
      return { value: current, unit: 'A', display: `${(current * 1000).toFixed(1)} mA` }
    }

    case 'ohm': {
      // Find a component between probes
      const comp = components.find((c) => {
        if (c.kind !== 'resistor') return false
        const cNetA = uf.find(c.holeA)
        const cNetB = uf.find(c.holeB)
        return (cNetA === netA && cNetB === netB) ||
               (cNetA === netB && cNetB === netA)
      })
      if (!comp) {
        // Check if probes are on same net (0 ohms)
        if (netA === netB) {
          return { value: 0, unit: 'Ω', display: '0 Ω' }
        }
        return { value: null, unit: 'Ω', display: 'O.L.' }
      }
      const ohms = comp.value
      if (ohms >= 1000) {
        return { value: ohms, unit: 'Ω', display: `${(ohms / 1000).toFixed(1)} kΩ` }
      }
      return { value: ohms, unit: 'Ω', display: `${ohms} Ω` }
    }

    case 'continuity': {
      const connected = netA === netB
      return {
        value: connected ? 1 : 0,
        unit: '',
        display: connected ? '🔊 BEEP' : '---',
      }
    }

    default:
      return { value: null, unit: '', display: '---' }
  }
}

// Get all hole IDs that are in the same net as a given hole
export function getNetMembers(holeId, components) {
  const uf = buildBreadboardUF()
  const wires = components.filter((c) => c.kind === 'wire')
  for (const w of wires) uf.union(w.holeA, w.holeB)
  return uf.members(holeId)
}
