import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowLeft } from 'lucide-react'
import FormulaCard from '@/components/FormulaCard'

export default function FormulaSheet({ onBack }) {
  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-4">📋 Chuleta de fórmulas</h1>

      <Accordion type="multiple" defaultValue={['ohm', 'power']} className="space-y-2">
        <AccordionItem value="ohm">
          <AccordionTrigger className="text-sm font-semibold">⚡ Ley de Ohm</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <FormulaCard name="Voltaje" formula="V = I × R" description="Voltios = Amperios × Ohmios" />
            <FormulaCard name="Intensidad" formula="I = V / R" description="Amperios = Voltios / Ohmios" />
            <FormulaCard name="Resistencia" formula="R = V / I" description="Ohmios = Voltios / Amperios" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="power">
          <AccordionTrigger className="text-sm font-semibold">💡 Potencia y Energía</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <FormulaCard name="Potencia" formula="P = V × I" description="Vatios (W)" />
            <FormulaCard name="Potencia (alt)" formula="P = I² × R = V² / R" />
            <FormulaCard name="Energía" formula="E = P × t" description="Julios (J). kWh = E / 3.600.000" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="series">
          <AccordionTrigger className="text-sm font-semibold">⛓️ Circuito Serie</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <FormulaCard name="R total" formula="RT = R1 + R2 + R3 + ..." description="Se suman todas" />
            <FormulaCard name="Corriente" formula="IT = I1 = I2 = I3" description="Igual en todas" />
            <FormulaCard name="Voltaje" formula="VT = V1 + V2 + V3" description="Se reparte (proporcional a R)" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="parallel">
          <AccordionTrigger className="text-sm font-semibold">🔀 Circuito Paralelo</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <FormulaCard name="R total" formula="1/RT = 1/R1 + 1/R2 + ..." description="Siempre menor que la menor R" />
            <FormulaCard name="2 resistencias" formula="RT = (R1 × R2) / (R1 + R2)" description="Fórmula rápida" />
            <FormulaCard name="Voltaje" formula="VT = V1 = V2 = V3" description="Igual en todas" />
            <FormulaCard name="Corriente" formula="IT = I1 + I2 + I3" description="Se reparte (más I por menor R)" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="led">
          <AccordionTrigger className="text-sm font-semibold">💡 LED</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <FormulaCard name="R protección" formula="R = (Vfuente − VLED) / ILED" description="VLED rojo ≈ 2V, ILED = 20mA" />
            <FormulaCard name="Ejemplo" formula="R = (10 − 2) / 0,02 = 400Ω" description="Valor comercial: 330Ω o 470Ω" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="method">
          <AccordionTrigger className="text-sm font-semibold">🧩 Método 5 pasos (mixto)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>🟦 <strong>1.</strong> Calcular R<sub>T</sub> — simplifica paralelo → suma serie</p>
              <p>🟩 <strong>2.</strong> Calcular I<sub>T</sub> = V<sub>T</sub> / R<sub>T</sub></p>
              <p>🟨 <strong>3.</strong> Identificar magnitudes iguales (I en serie, V en paralelo)</p>
              <p>🟧 <strong>4.</strong> Ohm por partes → V e I de cada componente</p>
              <p>🟥 <strong>5.</strong> Potencia → P = V × I para cada uno</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="conversions">
          <AccordionTrigger className="text-sm font-semibold">📏 Conversiones</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1">De</th>
                    <th className="text-left py-1">A</th>
                    <th className="text-left py-1">Operación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50"><td className="py-1">kΩ → Ω</td><td>× 1.000</td><td>2,2kΩ = 2.200Ω</td></tr>
                  <tr className="border-b border-border/50"><td className="py-1">MΩ → Ω</td><td>× 1.000.000</td><td>1MΩ = 1.000.000Ω</td></tr>
                  <tr className="border-b border-border/50"><td className="py-1">mA → A</td><td>÷ 1.000</td><td>50mA = 0,05A</td></tr>
                  <tr><td className="py-1">µA → A</td><td>÷ 1.000.000</td><td>500µA = 0,0005A</td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm font-semibold">🎨 Código de colores</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm mb-2 font-semibold">Ma-Ne-Ro-Na-Am-Ve-Az-Vi-Gr-Bl (0-9)</p>
            <p className="text-xs text-muted-foreground">"Me Nota Rara No Acabar Verde Azul Violeta Gris Blanca"</p>
            <p className="text-xs text-muted-foreground mt-1">Tolerancia: Dorado ±5%, Plateado ±10%</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="vocab">
          <AccordionTrigger className="text-sm font-semibold">📖 Vocabulario de examen</AccordionTrigger>
          <AccordionContent>
            <div className="text-xs space-y-1">
              <p><strong>Voltaje</strong> = Tensión = d.d.p. = f.e.m.</p>
              <p><strong>Intensidad</strong> = Corriente</p>
              <p><strong>Resistencia</strong> = Impedancia (simplificado)</p>
              <p><strong>Potencia</strong> = Consumo</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
