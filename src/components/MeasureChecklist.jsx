import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import ToleranceCalc from './ToleranceCalc'

export default function MeasureChecklist({ items, onAllChecked, color }) {
  const [values, setValues] = useState({})
  const allFilled = items.every((item) => values[item.label] !== undefined && values[item.label] !== '')

  const handleChange = (label, value) => {
    setValues((prev) => ({ ...prev, [label]: value }))
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{item.label}</CardTitle>
            <p className="text-xs text-muted-foreground">
              Valor esperado: {item.expected}{item.unit || 'V'}
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tu medida:</span>
              <input
                type="number"
                step="any"
                className="bg-secondary text-foreground rounded px-3 py-2 text-sm w-28 border border-input"
                placeholder="0.00"
                value={values[item.label] || ''}
                onChange={(e) => handleChange(item.label, e.target.value)}
              />
              <span className="text-sm text-muted-foreground">{item.unit || 'V'}</span>
            </div>
            {values[item.label] && (
              <ToleranceCalc
                theoretical={item.expected}
                measured={values[item.label]}
                unit={item.unit || 'V'}
              />
            )}
          </CardContent>
        </Card>
      ))}

      {allFilled && onAllChecked && (
        <Button
          className="w-full"
          style={{ backgroundColor: color }}
          onClick={() => onAllChecked(values)}
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Todas las medidas comprobadas
        </Button>
      )}
    </div>
  )
}
