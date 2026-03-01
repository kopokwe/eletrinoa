import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DynamicCircuitTable({ values, revealed }) {
  // values: { rt, r1, r2, r3, vt, v1, v2, v3, it, i1, i2, i3, pt, p1, p2, p3 }
  // revealed: Set of keys that have been answered correctly

  const cell = (key, unit) => {
    if (revealed.has(key) && values[key] != null) {
      return <span className="font-mono text-green-400">{values[key]}{unit}</span>
    }
    return <span className="text-muted-foreground">?</span>
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Tabla del Circuito</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1 pr-2"></th>
                <th className="text-center py-1 px-2">Total</th>
                <th className="text-center py-1 px-2">R1</th>
                <th className="text-center py-1 px-2">R2</th>
                <th className="text-center py-1 px-2">R3</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-1 pr-2 font-semibold">R (Ω)</td>
                <td className="text-center py-1">{cell('rt', 'Ω')}</td>
                <td className="text-center py-1">{cell('r1', 'Ω')}</td>
                <td className="text-center py-1">{cell('r2', 'Ω')}</td>
                <td className="text-center py-1">{cell('r3', 'Ω')}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-1 pr-2 font-semibold">V (V)</td>
                <td className="text-center py-1">{cell('vt', 'V')}</td>
                <td className="text-center py-1">{cell('v1', 'V')}</td>
                <td className="text-center py-1">{cell('v2', 'V')}</td>
                <td className="text-center py-1">{cell('v3', 'V')}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-1 pr-2 font-semibold">I (mA)</td>
                <td className="text-center py-1">{cell('it', 'mA')}</td>
                <td className="text-center py-1">{cell('i1', 'mA')}</td>
                <td className="text-center py-1">{cell('i2', 'mA')}</td>
                <td className="text-center py-1">{cell('i3', 'mA')}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 font-semibold">P (mW)</td>
                <td className="text-center py-1">{cell('pt', 'mW')}</td>
                <td className="text-center py-1">{cell('p1', 'mW')}</td>
                <td className="text-center py-1">{cell('p2', 'mW')}</td>
                <td className="text-center py-1">{cell('p3', 'mW')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
