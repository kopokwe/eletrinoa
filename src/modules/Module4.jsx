import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import QuizCard from '@/components/QuizCard'
import BuildStep from '@/components/BuildStep'
import { QUIZZES } from '@/data/quizzes'

const COLOR = '#34d399'

const COLOR_TABLE = [
  { color: 'Negro', digit: 0, mult: '×1', bg: '#000', text: '#fff' },
  { color: 'Marrón', digit: 1, mult: '×10', bg: '#8B4513', text: '#fff' },
  { color: 'Rojo', digit: 2, mult: '×100', bg: '#ef4444', text: '#fff' },
  { color: 'Naranja', digit: 3, mult: '×1k', bg: '#f97316', text: '#fff' },
  { color: 'Amarillo', digit: 4, mult: '×10k', bg: '#eab308', text: '#000' },
  { color: 'Verde', digit: 5, mult: '×100k', bg: '#22c55e', text: '#fff' },
  { color: 'Azul', digit: 6, mult: '×1M', bg: '#3b82f6', text: '#fff' },
  { color: 'Violeta', digit: 7, mult: '×10M', bg: '#8b5cf6', text: '#fff' },
  { color: 'Gris', digit: 8, mult: '—', bg: '#6b7280', text: '#fff' },
  { color: 'Blanco', digit: 9, mult: '—', bg: '#f5f5f5', text: '#000' },
]

export default function Module4({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(4)
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye'] // No comprueba
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(4, p))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        🔎 Módulo 4: Descifra las resistencias
      </h1>
      <p className="text-sm text-muted-foreground mb-4">Código de colores + tu bolsa de resistencias</p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="Código de colores de resistencias" pageRef="6, 8" color={COLOR}>
              <p>Las bandas de colores son un <strong>código secreto</strong> que indica el valor de la resistencia.</p>
              <p><strong>Lectura:</strong> 1ª banda = primer dígito, 2ª banda = segundo dígito, 3ª banda = multiplicador, 4ª banda = tolerancia.</p>
            </TheoryBlock>

            <TheoryBlock title="Tabla del código" color={COLOR}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1">Color</th>
                      <th className="text-center py-1">Dígito</th>
                      <th className="text-center py-1">Multiplicador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COLOR_TABLE.map((row) => (
                      <tr key={row.color} className="border-b border-border/50">
                        <td className="py-1">
                          <span className="inline-flex items-center gap-1">
                            <span className="w-4 h-3 rounded-sm inline-block border border-border/30" style={{ backgroundColor: row.bg }} />
                            {row.color}
                          </span>
                        </td>
                        <td className="text-center">{row.digit}</td>
                        <td className="text-center">{row.mult}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs"><strong>Tolerancia:</strong> Dorado = ±5%, Plateado = ±10%</p>
            </TheoryBlock>

            <TheoryBlock title="Regla mnemotécnica" color={COLOR}>
              <p className="font-semibold">"Me Nota Rara No Acabar Verde Azul Violeta Gris Blanca"</p>
              <p className="text-xs text-muted-foreground mt-1">
                Ma(0) Ne(1) Ro(2) Na(3) Am(4) Ve(5) Az(6) Vi(7) Gr(8) Bl(9)
              </p>
            </TheoryBlock>

            <TheoryBlock title="Importante" color={COLOR}>
              <p>El código de colores te da una <strong>ESTIMACIÓN</strong>. El polímetro te da el <strong>VALOR REAL</strong>. ¡Siempre verifica con el Venlab!</p>
            </TheoryBlock>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(4, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[4]}
            onComplete={() => { progress.completePhase(4, 'demuestra'); setActivePhase('construye') }}
            color={COLOR}
          />
        )}

        {activePhase === 'construye' && (
          <div className="space-y-3">
            <TheoryBlock title="Clasifica tu bolsa de resistencias" color={COLOR}>
              <p>Ahora vas a usar lo que has aprendido para organizar tus resistencias reales.</p>
            </TheoryBlock>

            <BuildStep step={1} color={COLOR}>
              <p><strong>Vacía la bolsa</strong> de resistencias sobre la mesa.</p>
            </BuildStep>
            <BuildStep step={2} color={COLOR}>
              <p><strong>Lee el código de colores</strong> de cada una y apunta el valor en papel.</p>
            </BuildStep>
            <BuildStep step={3} color={COLOR}>
              <p><strong>Mide cada una</strong> con el Venlab en modo Ω. Apunta el valor real.</p>
            </BuildStep>
            <BuildStep step={4} color={COLOR}>
              <p><strong>Compara</strong>: ¿coincide el código con la medida? ¿Están dentro de la tolerancia?</p>
            </BuildStep>
            <BuildStep step={5} color={COLOR}>
              <p><strong>Organiza en pilas</strong>: 220Ω, 330Ω, 470Ω, 1kΩ, 10kΩ... Las necesitarás para los siguientes módulos.</p>
            </BuildStep>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(4, 'construye'); onComplete() }}
            >
              ¡Resistencias clasificadas! ✓
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
