import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import QuizCard from '@/components/QuizCard'
import { QUIZZES } from '@/data/quizzes'

const COLOR = '#818cf8'

export default function Module2({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(2)
  const [activePhase, setActivePhase] = useState(mod.phases.includes('entiende') && !mod.phases.includes('demuestra') ? 'demuestra' : 'entiende')
  const phases = ['entiende', 'demuestra']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(2, p))

  const handleQuizComplete = () => {
    progress.completePhase(2, 'demuestra')
    onComplete()
  }

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        ⚡ Módulo 2: Las 3 magnitudes
      </h1>
      <p className="text-sm text-muted-foreground mb-4">Voltaje, Resistencia, Intensidad + conversiones</p>

      <PhaseNavigation
        phases={phases}
        activePhase={activePhase}
        completedPhases={mod.phases}
        unlockedPhases={unlockedPhases}
        onSelect={(p) => { setActivePhase(p); if (p === 'entiende') progress.completePhase(2, 'entiende') }}
        color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="Las 3 magnitudes eléctricas" pageRef="2-3" color={COLOR}>
              <div className="space-y-2">
                <p><strong>⚡ Voltaje (V)</strong> — La "fuerza" que empuja a los electrones. Como la altura de un tobogán: más alto = más velocidad.</p>
                <p><strong>Ω Resistencia (R)</strong> — Lo que frena a los electrones. Como un tobogán más estrecho: frena más.</p>
                <p><strong>A Intensidad (I)</strong> — Cuántos electrones pasan por segundo. Como la cantidad de gente bajando el tobogán.</p>
              </div>
            </TheoryBlock>

            <TheoryBlock title="Ley de Ohm — La fórmula mágica" pageRef="3, 5" color={COLOR}>
              <div className="bg-secondary/50 rounded p-3 text-center space-y-1">
                <p className="font-mono text-lg"><strong>V = I × R</strong></p>
                <p className="font-mono text-lg"><strong>I = V / R</strong></p>
                <p className="font-mono text-lg"><strong>R = V / I</strong></p>
              </div>
              <p className="mt-2">Solo necesitas saber dos de los tres para calcular el tercero.</p>
            </TheoryBlock>

            <TheoryBlock title="Escalera de conversiones" pageRef="3" color={COLOR}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1">De</th>
                      <th className="text-left py-1">A</th>
                      <th className="text-left py-1">Operación</th>
                      <th className="text-left py-1">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50"><td className="py-1">kΩ</td><td>Ω</td><td>× 1.000</td><td>2,2kΩ = 2.200Ω</td></tr>
                    <tr className="border-b border-border/50"><td className="py-1">MΩ</td><td>Ω</td><td>× 1.000.000</td><td>1MΩ = 1.000.000Ω</td></tr>
                    <tr className="border-b border-border/50"><td className="py-1">A</td><td>mA</td><td>× 1.000</td><td>0,05A = 50mA</td></tr>
                    <tr><td className="py-1">mA</td><td>A</td><td>÷ 1.000</td><td>50mA = 0,05A</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Truco: subir un peldaño = ÷1.000, bajar = ×1.000</p>
            </TheoryBlock>

            <Button
              className="w-full"
              style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(2, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[2]}
            onComplete={handleQuizComplete}
            color={COLOR}
          />
        )}
      </div>
    </div>
  )
}
