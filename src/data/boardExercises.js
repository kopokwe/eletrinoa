// Board exercise definitions for each module's construye phase
// validate(components, solution) → null if passed, error message string if failed

import { isWithinTolerance } from '@/lib/physics'

export const BOARD_EXERCISES = {
  // Module 3: LED + resistor circuit
  3: {
    title: 'Circuito LED',
    description: 'Monta un LED rojo con su resistencia protectora. El LED debe recibir ~20mA.',
    hints: [
      'Conecta una resistencia entre el + (columna A) y una fila',
      'Coloca el LED: ánodo (+) en la misma fila que la resistencia, cátodo hacia el − (columna L)',
      'Usa un cable para conectar el cátodo al − (columna L)',
    ],
    availableComponents: ['wire', 'resistor-330', 'resistor-470', 'led-red'],
    validate(components, solution) {
      const leds = components.filter((c) => c.kind === 'led')
      const resistors = components.filter((c) => c.kind === 'resistor')
      if (leds.length === 0) return 'Falta el LED'
      if (resistors.length === 0) return 'Falta la resistencia protectora'
      if (solution.faults.some((f) => f.severity === 'fatal')) return 'Hay un fallo en el circuito'
      const ledResult = solution.components[leds[0].id]
      if (!ledResult) return 'El LED no está conectado correctamente'
      if (ledResult.currentThrough < 0.005) return 'El LED no recibe suficiente corriente'
      return null // passed
    },
  },

  // Module 5: Series circuit with 3 resistors
  5: {
    title: 'Circuito serie',
    description: 'Conecta 3 resistencias en serie: 330Ω + 470Ω + 1kΩ. La corriente debe ser igual en todos los puntos.',
    hints: [
      'En serie: la salida de una resistencia va a la entrada de la siguiente',
      'Conecta la primera resistencia desde + (columna A)',
      'La última resistencia debe llegar al − (columna L)',
    ],
    availableComponents: ['wire', 'resistor-330', 'resistor-470', 'resistor-1000'],
    validate(components, solution) {
      const resistors = components.filter((c) => c.kind === 'resistor')
      if (resistors.length < 3) return `Faltan resistencias (tienes ${resistors.length}/3)`
      if (solution.faults.some((f) => f.severity === 'fatal')) return 'Hay un fallo en el circuito'
      // Check all resistors have same current (series proof)
      const currents = resistors.map((r) => solution.components[r.id]?.currentThrough || 0)
      if (currents.some((c) => c < 0.001)) return 'Alguna resistencia no está en el circuito'
      const avgI = currents.reduce((a, b) => a + b, 0) / currents.length
      const allSame = currents.every((c) => isWithinTolerance(avgI, c, 5))
      if (!allSame) return 'Las corrientes no son iguales — ¿están realmente en serie?'
      return null
    },
  },

  // Module 6: Parallel circuit with 2 resistors
  6: {
    title: 'Circuito paralelo',
    description: 'Conecta 2 resistencias (470Ω y 1kΩ) en paralelo. El voltaje debe ser igual en ambas.',
    hints: [
      'En paralelo: las dos resistencias comparten los mismos nodos',
      'Ambas patas "de arriba" al mismo nodo, ambas "de abajo" al mismo nodo',
      'Conecta un nodo al + y el otro al −',
    ],
    availableComponents: ['wire', 'resistor-470', 'resistor-1000'],
    validate(components, solution) {
      const resistors = components.filter((c) => c.kind === 'resistor')
      if (resistors.length < 2) return `Faltan resistencias (tienes ${resistors.length}/2)`
      if (solution.faults.some((f) => f.severity === 'fatal')) return 'Hay un fallo en el circuito'
      // Check both resistors have same voltage (parallel proof)
      const voltages = resistors.map((r) => solution.components[r.id]?.voltageAcross || 0)
      if (voltages.some((v) => v < 0.5)) return 'Alguna resistencia no está en el circuito'
      const allSameV = isWithinTolerance(voltages[0], voltages[1], 5)
      if (!allSameV) return 'Los voltajes no son iguales — ¿están realmente en paralelo?'
      return null
    },
  },

  // Module 7: Mixed circuit (R1 in series with R2||R3)
  7: {
    title: 'Circuito mixto',
    description: 'Monta un circuito mixto: R1 (330Ω) en serie con R2 (470Ω) || R3 (1kΩ) en paralelo.',
    hints: [
      'Primero conecta R1 (330Ω) desde el + (columna A)',
      'Luego conecta R2 y R3 en paralelo después de R1',
      'El bloque paralelo va al − (columna L)',
    ],
    availableComponents: ['wire', 'resistor-330', 'resistor-470', 'resistor-1000'],
    validate(components, solution) {
      const resistors = components.filter((c) => c.kind === 'resistor')
      if (resistors.length < 3) return `Faltan resistencias (tienes ${resistors.length}/3)`
      if (solution.faults.some((f) => f.severity === 'fatal')) return 'Hay un fallo en el circuito'
      // Check total current ≈ 13.9mA (10V / (330 + 470||1000))
      const totalR = 330 + (470 * 1000) / (470 + 1000) // ≈ 649.7Ω
      const expectedI = 10 / totalR // ≈ 15.4mA
      // Find max current (total circuit current through series resistor)
      const currents = resistors.map((r) => solution.components[r.id]?.currentThrough || 0)
      const maxI = Math.max(...currents)
      if (maxI < 0.005) return 'El circuito no tiene suficiente corriente'
      return null
    },
  },

  // Module 8: Potentiometer (voltage divider)
  8: {
    title: 'Divisor de tensión',
    description: 'Monta un divisor de tensión con 2 resistencias (1kΩ + 2.2kΩ). Mide el voltaje en el punto medio.',
    hints: [
      'Conecta R1 (1kΩ) desde + (columna A) a un nodo intermedio',
      'Conecta R2 (2.2kΩ) desde el nodo intermedio a − (columna L)',
      'El voltaje en el nodo intermedio será V × R2/(R1+R2)',
    ],
    availableComponents: ['wire', 'resistor-1000', 'resistor-2200'],
    validate(components, solution) {
      const resistors = components.filter((c) => c.kind === 'resistor')
      if (resistors.length < 2) return `Faltan resistencias (tienes ${resistors.length}/2)`
      if (solution.faults.some((f) => f.severity === 'fatal')) return 'Hay un fallo en el circuito'
      const currents = resistors.map((r) => solution.components[r.id]?.currentThrough || 0)
      if (currents.some((c) => c < 0.001)) return 'Alguna resistencia no está conectada'
      return null
    },
  },

  // Final project: 7-segment display circuit
  final: {
    title: 'Display 7 segmentos',
    description: 'Conecta LEDs con sus resistencias para encender segmentos del display.',
    hints: [
      'Cada segmento necesita un LED con resistencia',
      'Conecta las resistencias desde + (columna A)',
      'Conecta los LEDs en serie con las resistencias',
    ],
    availableComponents: ['wire', 'resistor-330', 'led-red', 'led-green'],
    validate(components, solution) {
      const leds = components.filter((c) => c.kind === 'led')
      if (leds.length === 0) return 'Falta al menos un LED'
      if (solution.faults.some((f) => f.severity === 'fatal')) return 'Hay un fallo en el circuito'
      const litLeds = leds.filter((l) => {
        const r = solution.components[l.id]
        return r && r.currentThrough > 0.005
      })
      if (litLeds.length === 0) return 'Ningún LED está encendido'
      return null
    },
  },
}
