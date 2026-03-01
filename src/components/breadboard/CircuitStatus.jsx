import { formatResistance, formatCurrent } from '@/lib/physics'

export default function CircuitStatus({ solution, components }) {
  if (!solution || !solution.valid) return null

  const compEntries = Object.entries(solution.components)
  if (compEntries.length === 0) return null

  return (
    <div className="rounded-lg border border-secondary/50 bg-secondary/20 p-3 space-y-2">
      <h4 className="text-xs font-semibold text-emerald-400">📊 Valores del circuito</h4>
      {compEntries.map(([id, vals]) => {
        const comp = components.find((c) => c.id === id)
        if (!comp) return null

        let label = ''
        if (comp.kind === 'resistor') label = `Resistencia ${formatResistance(comp.value)}`
        else if (comp.kind === 'led') label = `LED ${comp.ledColor === 'red' ? 'rojo' : comp.ledColor === 'green' ? 'verde' : 'amarillo'}`

        return (
          <div key={id} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono text-foreground">
              {vals.voltageAcross.toFixed(2)}V · {formatCurrent(vals.currentThrough)} · {(vals.powerDissipated * 1000).toFixed(1)}mW
            </span>
          </div>
        )
      })}
    </div>
  )
}
