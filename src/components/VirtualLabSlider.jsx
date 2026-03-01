import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { voltageDivider } from '@/lib/physics'

export default function VirtualLabSlider({ mode, vtotal = 5, rFixed = 1000 }) {
  const isLDR = mode === 'ldr'
  const [position, setPosition] = useState(50)

  // LDR: 200Ω (full sun) to 50000Ω (darkness)
  // Thermistor NTC: 500Ω (hot) to 10000Ω (cold)
  const rMin = isLDR ? 200 : 500
  const rMax = isLDR ? 50000 : 10000
  const rVariable = rMin + (rMax - rMin) * ((100 - position) / 100)

  const vFixed = voltageDivider(vtotal, rVariable, rFixed)
  const vVariable = vtotal - vFixed
  const iTotal = (vtotal / (rVariable + rFixed)) * 1000 // mA

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">
          {isLDR ? '☀️ Simulador LDR' : '🌡️ Simulador Termistor NTC'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{isLDR ? '🌑 Oscuridad' : '🧊 Frío'}</span>
            <span>{isLDR ? '☀️ Sol pleno' : '🔥 Caliente'}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* Virtual circuit display */}
        <div className="bg-secondary/50 rounded-lg p-3 space-y-2 text-sm font-mono">
          <div className="flex justify-between">
            <span>R {isLDR ? 'LDR' : 'NTC'}:</span>
            <span className="text-amber-400">{Math.round(rVariable)}Ω</span>
          </div>
          <div className="flex justify-between">
            <span>R fija:</span>
            <span>{rFixed}Ω</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span>V en R fija:</span>
            <span className="text-green-400 font-bold">{vFixed.toFixed(2)}V</span>
          </div>
          <div className="flex justify-between">
            <span>V en {isLDR ? 'LDR' : 'NTC'}:</span>
            <span className="text-cyan-400">{vVariable.toFixed(2)}V</span>
          </div>
          <div className="flex justify-between">
            <span>I total:</span>
            <span>{iTotal.toFixed(2)}mA</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {isLDR
            ? 'Tu móvil tiene un sensor de luz que funciona exactamente así. ↑Luz → ↓R_LDR → ↑V en R fija.'
            : 'El termostato de tu casa usa un termistor NTC. ↑Temperatura → ↓R_NTC → ↑V en R fija.'}
        </p>
      </CardContent>
    </Card>
  )
}
