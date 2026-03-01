// Ohm's Law
export const ohmV = (I, R) => I * R
export const ohmI = (V, R) => V / R
export const ohmR = (V, I) => V / I

// Power
export const power = (V, I) => V * I
export const powerFromR = (I, R) => I * I * R
export const powerFromV = (V, R) => (V * V) / R

// Energy
export const energy = (P, t) => P * t
export const energyToKWh = (joules) => joules / 3_600_000

// Series circuits
export const seriesR = (resistors) => resistors.reduce((sum, r) => sum + r, 0)

// Parallel circuits
export const parallelR = (resistors) => {
  const invSum = resistors.reduce((sum, r) => sum + 1 / r, 0)
  return 1 / invSum
}

// LED resistor calculation
export const ledResistor = (Vsource, Vled = 2, Iled = 0.02) =>
  (Vsource - Vled) / Iled

// Voltage divider: voltage across R2 in R1-R2 series
export const voltageDivider = (Vtotal, R1, R2) => Vtotal * (R2 / (R1 + R2))

// Tolerance check
export const toleranceCheck = (theoretical, measured) => {
  if (theoretical === 0) return { percent: 0, status: 'green', message: '' }
  const percent = Math.abs((measured - theoretical) / theoretical) * 100
  const rounded = Math.round(percent * 10) / 10

  if (percent <= 5) {
    return {
      percent: rounded,
      status: 'green',
      message: `✅ Tu ${measured}V está a solo un ${rounded}% del valor teórico (${theoretical}V). Los componentes reales no son perfectos, ¡y eso es normal en ingeniería!`,
    }
  }
  if (percent <= 15) {
    return {
      percent: rounded,
      status: 'yellow',
      message: `⚠️ Tu medida se desvía un ${rounded}% del valor teórico (${theoretical}). Comprueba que las puntas hacen buen contacto y que la fuente está a 10V.`,
    }
  }
  return {
    percent: rounded,
    status: 'red',
    message: `❌ Diferencia del ${rounded}%. Algo no cuadra. Posibles causas: resistencia equivocada, cable suelto, fuente no a 10V.`,
  }
}

// Color code
const COLOR_VALUES = {
  negro: 0, marrón: 1, rojo: 2, naranja: 3, amarillo: 4,
  verde: 5, azul: 6, violeta: 7, gris: 8, blanco: 9,
}

const MULTIPLIERS = {
  negro: 1, marrón: 10, rojo: 100, naranja: 1_000, amarillo: 10_000,
  verde: 100_000, azul: 1_000_000, violeta: 10_000_000,
  dorado: 0.1, plateado: 0.01,
}

const TOLERANCES = {
  marrón: 1, rojo: 2, verde: 0.5, azul: 0.25,
  violeta: 0.1, gris: 0.05, dorado: 5, plateado: 10,
}

export const colorCodeValue = (band1, band2, multiplierBand) => {
  const d1 = COLOR_VALUES[band1]
  const d2 = COLOR_VALUES[band2]
  const mult = MULTIPLIERS[multiplierBand]
  if (d1 == null || d2 == null || mult == null) return null
  return (d1 * 10 + d2) * mult
}

export const colorCodeTolerance = (toleranceBand) => TOLERANCES[toleranceBand] || null

// Format resistance value for display
export const formatResistance = (ohms) => {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms % 1_000_000 === 0 ? 0 : 1)}MΩ`
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms % 1_000 === 0 ? 0 : 1)}kΩ`
  return `${ohms}Ω`
}

// Format current value for display
export const formatCurrent = (amps) => {
  if (amps >= 1) return `${amps.toFixed(2)}A`
  if (amps >= 0.001) return `${(amps * 1000).toFixed(1)}mA`
  return `${(amps * 1_000_000).toFixed(0)}µA`
}

// Check if answer is within rounding tolerance (±2%)
export const isWithinTolerance = (expected, actual, tolerancePercent = 2) => {
  if (expected === 0) return actual === 0
  return Math.abs((actual - expected) / expected) * 100 <= tolerancePercent
}
