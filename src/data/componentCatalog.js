// Available components for the virtual breadboard

// Resistor color band mapping: digit → CSS color
const BAND_COLORS = {
  0: '#000000', // negro
  1: '#8B4513', // marrón
  2: '#EF4444', // rojo
  3: '#F97316', // naranja
  4: '#EAB308', // amarillo
  5: '#22C55E', // verde
  6: '#3B82F6', // azul
  7: '#8B5CF6', // violeta
  8: '#6B7280', // gris
  9: '#FFFFFF', // blanco
}

const MULTIPLIER_COLORS = {
  0: '#000000',    // ×1
  1: '#8B4513',    // ×10
  2: '#EF4444',    // ×100
  3: '#F97316',    // ×1k
  4: '#EAB308',    // ×10k
  5: '#22C55E',    // ×100k
}

const TOLERANCE_GOLD = '#C0A000'

// Get the 4 color bands for a resistance value
export function resistorBands(ohms) {
  if (ohms <= 0) return ['#000', '#000', '#000', TOLERANCE_GOLD]
  let value = ohms
  let mult = 0
  while (value >= 100) { value /= 10; mult++ }
  while (value < 10 && value > 0) { value *= 10; mult-- }
  const d1 = Math.floor(value / 10)
  const d2 = Math.round(value) % 10
  return [
    BAND_COLORS[d1] || '#000',
    BAND_COLORS[d2] || '#000',
    MULTIPLIER_COLORS[mult] || '#000',
    TOLERANCE_GOLD,
  ]
}

// LED forward voltages
export const LED_VF = { red: 2.0, green: 2.2, yellow: 2.1 }
export const LED_MAX_I = 0.03 // 30mA max
export const LED_NOMINAL_I = 0.02 // 20mA nominal

// LED display colors
export const LED_COLORS = {
  red: '#EF4444',
  green: '#22C55E',
  yellow: '#EAB308',
}

// Component catalog for the palette
export const CATALOG_ITEMS = [
  { kind: 'wire', label: 'Cable', icon: '〰️', description: 'Conecta dos puntos' },
  { kind: 'resistor', value: 330, label: '330Ω', icon: '⫘', description: 'Para LED rojo' },
  { kind: 'resistor', value: 470, label: '470Ω', icon: '⫘', description: 'Para LED verde' },
  { kind: 'resistor', value: 1000, label: '1kΩ', icon: '⫘', description: 'Uso general' },
  { kind: 'resistor', value: 2200, label: '2.2kΩ', icon: '⫘', description: 'Circuitos mixtos' },
  { kind: 'resistor', value: 10000, label: '10kΩ', icon: '⫘', description: 'Alta resistencia' },
  { kind: 'led', ledColor: 'red', label: 'LED Rojo', icon: '🔴', description: 'V_f ≈ 2V' },
  { kind: 'led', ledColor: 'green', label: 'LED Verde', icon: '🟢', description: 'V_f ≈ 2.2V' },
  { kind: 'led', ledColor: 'yellow', label: 'LED Amarillo', icon: '🟡', description: 'V_f ≈ 2.1V' },
]
