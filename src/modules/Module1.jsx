import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import QuizCard from '@/components/QuizCard'
import { QUIZZES } from '@/data/quizzes'

const COLOR = '#22d3ee'

export default function Module1({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(1)
  const [activePhase, setActivePhase] = useState(mod.phases.length > 0 && !mod.phases.includes('demuestra') ? 'demuestra' : 'entiende')
  const phases = ['entiende', 'demuestra']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(1, p))

  const handleQuizComplete = () => {
    progress.completePhase(1, 'demuestra')
    onComplete()
  }

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        🔍 Módulo 1: Conoce tu escáner
      </h1>
      <p className="text-sm text-muted-foreground mb-4">El polímetro Venlab VM-S208</p>

      <PhaseNavigation
        phases={phases}
        activePhase={activePhase}
        completedPhases={mod.phases}
        unlockedPhases={unlockedPhases}
        onSelect={(p) => { setActivePhase(p); if (p === 'entiende') progress.completePhase(1, 'entiende') }}
        color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="Tu polimetro es un escáner de superhéroe" pageRef="1" color={COLOR}>
              <p>Tu Venlab VM-S208 puede <strong>ver cosas invisibles</strong>: voltaje, corriente y resistencia.</p>
            </TheoryBlock>

            <TheoryBlock title="Dos tipos de corriente" pageRef="1" color={COLOR}>
              <p><strong>Alterna (AC ∿)</strong> — La de casa. Cambia de sentido constantemente.</p>
              <p><strong>Continua (DC ⎓)</strong> — La de pilas y electrónica. Siempre va en el mismo sentido.</p>
              <p className="font-semibold mt-2">Nosotros trabajamos siempre con DC.</p>
            </TheoryBlock>

            <TheoryBlock title="4 modos de medida" pageRef="1, 9" color={COLOR}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1">Modo</th>
                      <th className="text-left py-1">Rojo →</th>
                      <th className="text-left py-1">Selector</th>
                      <th className="text-left py-1">Para qué</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-1">🔊 Continuidad</td>
                      <td>VΩHz</td>
                      <td>🔊</td>
                      <td>¿Hay conexión?</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-1">⚡ Tensión (V)</td>
                      <td>VΩHz</td>
                      <td>V DC</td>
                      <td>Medir voltaje</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-1">Ω Resistencia</td>
                      <td>VΩHz</td>
                      <td>Ω</td>
                      <td>Medir R</td>
                    </tr>
                    <tr>
                      <td className="py-1">A Intensidad</td>
                      <td><strong>mA</strong></td>
                      <td>A DC</td>
                      <td>Medir corriente</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Negro SIEMPRE va a COM. Rojo cambia según el modo.</p>
            </TheoryBlock>

            <TheoryBlock title="Regla de oro" color={COLOR}>
              <p>Para medir <strong>V y Ω</strong> → polimetro <strong>EN PARALELO</strong></p>
              <p>Para medir <strong>I (corriente)</strong> → polimetro <strong>EN SERIE</strong> (intercalado)</p>
            </TheoryBlock>

            <Button
              className="w-full"
              style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(1, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[1]}
            onComplete={handleQuizComplete}
            color={COLOR}
          />
        )}
      </div>
    </div>
  )
}
