import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import QuizCard from '@/components/QuizCard'
import BuildStep from '@/components/BuildStep'
import WarningBox from '@/components/WarningBox'
import MeasureChecklist from '@/components/MeasureChecklist'
import { QUIZZES } from '@/data/quizzes'

const COLOR = '#a78bfa'

export default function Module5({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(5)
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye', 'comprueba']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(5, p))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        ⛓️ Módulo 5: Todo en fila
      </h1>
      <p className="text-sm text-muted-foreground mb-4">Circuitos serie + potencia + energía</p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="Circuito en serie" pageRef="4-6" color={COLOR}>
              <p>En un circuito <strong>serie</strong>, los componentes van uno tras otro, como vagones de un tren.</p>
              <div className="bg-secondary/50 rounded p-3 space-y-1">
                <p className="font-mono"><strong>R<sub>T</sub> = R1 + R2 + R3 + ...</strong></p>
                <p className="text-xs text-muted-foreground">Las resistencias se SUMAN</p>
              </div>
            </TheoryBlock>

            <TheoryBlock title="Reglas del serie" pageRef="4-5" color={COLOR}>
              <p>🔑 <strong>La corriente es IGUAL</strong> en todas las resistencias (solo hay un camino)</p>
              <p>🔑 <strong>El voltaje se REPARTE</strong> entre las resistencias (proporcionalmente a R)</p>
              <p>La resistencia mayor se lleva más voltaje.</p>
            </TheoryBlock>

            <TheoryBlock title="Potencia y Energía" pageRef="4-5" color={COLOR}>
              <div className="bg-secondary/50 rounded p-3 space-y-1">
                <p className="font-mono"><strong>P = V × I</strong> (vatios, W)</p>
                <p className="font-mono"><strong>E = P × t</strong> (julios, J)</p>
                <p className="font-mono text-xs">kWh = E / 3.600.000</p>
              </div>
              <p className="mt-2">La potencia es cuánta energía se consume por segundo.</p>
            </TheoryBlock>

            <TheoryBlock title="Ejemplo: 3 resistencias en serie" color={COLOR}>
              <p>R1=220Ω, R2=330Ω, R3=1kΩ, V<sub>T</sub>=10V</p>
              <p>R<sub>T</sub> = 220 + 330 + 1.000 = <strong>1.550Ω</strong></p>
              <p>I<sub>T</sub> = 10 / 1.550 = <strong>6,45mA</strong></p>
              <p>V<sub>3</sub> = 0,00645 × 1.000 = <strong>6,45V</strong> (R3 se lleva la mayor parte)</p>
            </TheoryBlock>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(5, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[5]}
            onComplete={() => { progress.completePhase(5, 'demuestra'); setActivePhase('construye') }}
            color={COLOR}
          />
        )}

        {activePhase === 'construye' && (
          <div className="space-y-3">
            <WarningBox>Fuente APAGADA antes de montar. Ajusta a 10V antes de conectar el circuito.</WarningBox>

            <BuildStep step={1} color={COLOR}>
              <p><strong>Busca 3 resistencias</strong> de tu bolsa: la más cercana a 220Ω, 330Ω y 1kΩ.</p>
            </BuildStep>
            <BuildStep step={2} color={COLOR}>
              <p><strong>Conéctalas en serie</strong>: R1 → R2 → R3, una tras otra en la breadboard.</p>
            </BuildStep>
            <BuildStep step={3} color={COLOR}>
              <p><strong>Conecta la fuente</strong>: rail + al inicio de R1, rail − al final de R3.</p>
            </BuildStep>
            <BuildStep step={4} color={COLOR}>
              <p><strong>Enciende la fuente</strong> y verifica 10V con el Venlab.</p>
            </BuildStep>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(5, 'construye'); setActivePhase('comprueba') }}
            >
              ¡Circuito montado! Vamos a medir →
            </Button>
          </div>
        )}

        {activePhase === 'comprueba' && (
          <div className="space-y-4">
            <TheoryBlock title="Mide cada voltaje y la corriente" color={COLOR}>
              <p>Pon el Venlab en modo V DC y mide en paralelo con cada resistencia. Luego mide I en serie.</p>
            </TheoryBlock>

            <MeasureChecklist
              items={[
                { label: 'V en R1 (220Ω)', expected: 1.42, unit: 'V' },
                { label: 'V en R2 (330Ω)', expected: 2.13, unit: 'V' },
                { label: 'V en R3 (1kΩ)', expected: 6.45, unit: 'V' },
                { label: 'Corriente total (I)', expected: 6.45, unit: 'mA' },
              ]}
              onAllChecked={() => { progress.completePhase(5, 'comprueba'); onComplete() }}
              color={COLOR}
            />
          </div>
        )}
      </div>
    </div>
  )
}
