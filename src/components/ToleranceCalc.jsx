import { toleranceCheck } from '@/lib/physics'

const statusColors = {
  green: 'bg-green-500/10 text-green-300 border-green-500',
  yellow: 'bg-amber-500/10 text-amber-300 border-amber-500',
  red: 'bg-red-500/10 text-red-300 border-red-500',
}

export default function ToleranceCalc({ theoretical, measured, unit = 'V' }) {
  if (measured === null || measured === undefined || measured === '') return null

  const result = toleranceCheck(theoretical, Number(measured))

  return (
    <div className={`text-sm p-3 rounded border ${statusColors[result.status]}`}>
      <p>{result.message.replace(/V/g, unit)}</p>
      <p className="text-xs mt-1 opacity-75">
        Valor teórico: {theoretical}{unit} | Tu medida: {measured}{unit} | Diferencia: {result.percent}%
      </p>
    </div>
  )
}
