import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import QuizCard from '@/components/QuizCard'
import BuildStep from '@/components/BuildStep'
import WarningBox from '@/components/WarningBox'
import MeasureChecklist from '@/components/MeasureChecklist'
import VirtualLabSlider from '@/components/VirtualLabSlider'
import { QUIZZES } from '@/data/quizzes'

const COLOR = '#fbbf24'

export default function Module8({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(8)
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye', 'comprueba', 'laboratorio']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(8, p))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        🎛️ Módulo 8: Controla el voltaje
      </h1>
      <p className="text-sm text-muted-foreground mb-4">Potenciómetro + Lab virtual LDR/Termistor</p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="El potenciómetro: un divisor ajustable" pageRef="12" color={COLOR}>
              <p>Un <strong>potenciómetro</strong> es una resistencia variable con 3 patas:</p>
              <p>Pata 1 y 3 → resistencia total fija (ej. 10kΩ)</p>
              <p>Pata 2 (central) → punto de división variable</p>
              <p>Al girar el eje, cambias <strong>dónde se divide el voltaje</strong>.</p>
            </TheoryBlock>

            <TheoryBlock title="Divisor de tensión" color={COLOR}>
              <div className="bg-secondary/50 rounded p-3 text-center">
                <p className="font-mono text-lg"><strong>V<sub>salida</sub> = V<sub>T</sub> × (posición)</strong></p>
              </div>
              <p className="mt-2">Si el pot está al 75% con 10V → V<sub>salida</sub> = 7,5V</p>
            </TheoryBlock>

            <TheoryBlock title="Resistencias variables" pageRef="12" color={COLOR}>
              <p><strong>LDR</strong> (Light Dependent Resistor): ↑Luz → ↓Resistencia</p>
              <p><strong>Termistor NTC</strong>: ↑Temperatura → ↓Resistencia</p>
              <p><strong>Termistor PTC</strong>: ↑Temperatura → ↑Resistencia</p>
              <p className="text-xs text-muted-foreground mt-2">No tienes LDR ni termistor físicos, pero los simularemos virtualmente.</p>
            </TheoryBlock>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(8, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[8]}
            onComplete={() => { progress.completePhase(8, 'demuestra'); setActivePhase('construye') }}
            color={COLOR}
          />
        )}

        {activePhase === 'construye' && (
          <div className="space-y-3">
            <WarningBox>
              El potenciómetro puede no caber bien en la breadboard. Si el eje es metálico, usa cables para conectar las patas.
            </WarningBox>

            <BuildStep step={1} color={COLOR}>
              <p><strong>Conecta pata 1</strong> del potenciómetro al rail + (10V).</p>
            </BuildStep>
            <BuildStep step={2} color={COLOR}>
              <p><strong>Conecta pata 3</strong> al rail − (GND).</p>
            </BuildStep>
            <BuildStep step={3} color={COLOR}>
              <p><strong>Mide la pata central (2)</strong> con el Venlab en modo V DC respecto a GND.</p>
            </BuildStep>
            <BuildStep step={4} color={COLOR}>
              <p><strong>Gira el eje</strong> y observa cómo cambia el voltaje de 0V a 10V.</p>
            </BuildStep>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(8, 'construye'); setActivePhase('comprueba') }}
            >
              ¡Funciona! Vamos a medir →
            </Button>
          </div>
        )}

        {activePhase === 'comprueba' && (
          <div className="space-y-4">
            <TheoryBlock title="Mide el pot en distintas posiciones" color={COLOR}>
              <p>Gira el pot a aproximadamente cada posición y mide el voltaje central.</p>
            </TheoryBlock>

            <MeasureChecklist
              items={[
                { label: 'Pot al ~25%', expected: 2.5, unit: 'V' },
                { label: 'Pot al ~50%', expected: 5, unit: 'V' },
                { label: 'Pot al ~75%', expected: 7.5, unit: 'V' },
              ]}
              onAllChecked={() => { progress.completePhase(8, 'comprueba'); setActivePhase('laboratorio') }}
              color={COLOR}
            />
          </div>
        )}

        {activePhase === 'laboratorio' && (
          <div className="space-y-4">
            <TheoryBlock title="Laboratorio Virtual" color={COLOR}>
              <p>No tienes LDR ni termistor físicos, pero aquí puedes experimentar con simuladores interactivos.</p>
            </TheoryBlock>

            <VirtualLabSlider mode="ldr" vtotal={5} rFixed={1000} />
            <VirtualLabSlider mode="thermistor" vtotal={5} rFixed={1000} />

            <QuizCard
              questions={QUIZZES['8-lab']}
              onComplete={() => {
                progress.completePhase(8, 'laboratorio')
                progress.unlockAchievement('simuladora')
                onComplete()
              }}
              color={COLOR}
            />
          </div>
        )}
      </div>
    </div>
  )
}
