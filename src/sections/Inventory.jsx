import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Check, Circle } from 'lucide-react'

const COMPONENTS = [
  { name: 'Breadboard Ariston', qty: 1, note: '830 puntos, estándar', have: true },
  { name: 'LED rojo 5mm', qty: 1, note: 'Único LED disponible', have: true },
  { name: 'Display 7 segmentos TDSR 5160 G', qty: 1, note: 'Telefunken, cátodo común', have: true },
  { name: 'Potenciómetro rotatorio', qty: 1, note: 'Eje metálico', have: true },
  { name: 'Bolsa de resistencias surtidas', qty: 1, note: 'Valores desconocidos', have: true },
  { name: 'Rollo de cable (verde/blanco)', qty: 1, note: 'Hay que cortar y pelar', have: true },
  { name: 'Fuente Mean Well 12V', qty: 1, note: 'Ajustable a 10V vía pot Vo', have: true },
  { name: 'Multímetro Venlab VM-S208', qty: 1, note: 'V/A/Ω/continuidad/diodo', have: true },
  { name: 'LDR', qty: 0, note: 'No disponible (simulación virtual)', have: false },
  { name: 'Termistor', qty: 0, note: 'No disponible (simulación virtual)', have: false },
]

const PREP_STEPS = [
  'Vacía la bolsa de resistencias y mide cada una con el Venlab',
  'Organiza en pilas: 220Ω, 330Ω, 470Ω, 1kΩ, 10kΩ',
  'Corta 10-15 cables de ~8cm y pela 5mm en cada punta',
  'Ajusta la Mean Well a 10,0V con el pot interno Vo',
  'Verifica los 10V con el Venlab en modo V DC',
]

export default function Inventory({ onBack }) {
  const [checked, setChecked] = useState({})

  const toggle = (idx) => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-4">🧰 Inventario</h1>

      <div className="space-y-2 mb-6">
        {COMPONENTS.map((comp) => (
          <Card key={comp.name} className={!comp.have ? 'opacity-50' : ''}>
            <CardContent className="pt-3 flex items-center gap-3">
              <Badge variant={comp.have ? 'default' : 'secondary'} className="shrink-0">
                {comp.have ? `×${comp.qty}` : '✗'}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{comp.name}</p>
                <p className="text-xs text-muted-foreground">{comp.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-3">📝 Preparación</h2>
      <div className="space-y-2">
        {PREP_STEPS.map((step, idx) => (
          <button
            key={idx}
            onClick={() => toggle(idx)}
            className="w-full flex items-start gap-3 text-left p-3 rounded-lg bg-card border border-border"
          >
            {checked[idx] ? (
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${checked[idx] ? 'line-through text-muted-foreground' : ''}`}>
              {step}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
