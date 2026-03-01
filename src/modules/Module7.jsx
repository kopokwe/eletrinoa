import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import QuizCard from '@/components/QuizCard'
import BuildStep from '@/components/BuildStep'
import WarningBox from '@/components/WarningBox'
import MeasureChecklist from '@/components/MeasureChecklist'
import DynamicCircuitTable from '@/components/DynamicCircuitTable'
import { QUIZZES } from '@/data/quizzes'

const COLOR = '#f97316'

// Canonical values from PRD
const CIRCUIT = {
  rt: 720, r1: 220, r2: 1000, r3: 1000,
  vt: 10, v1: 3.06, v2: 6.94, v3: 6.94,
  it: 13.9, i1: 13.9, i2: 6.94, i3: 6.94,
  pt: 139, p1: 42.5, p2: 48.2, p3: 48.2,
}

export default function Module7({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(7)
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye', 'comprueba']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(7, p))
  const [revealed, setRevealed] = useState(new Set(['r1', 'r2', 'r3', 'vt']))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        🧩 Módulo 7: El jefe final
      </h1>
      <p className="text-sm text-muted-foreground mb-4">Circuito mixto + método de 5 pasos</p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="Circuitos mixtos" pageRef="6-7, 10" color={COLOR}>
              <p>Un circuito <strong>mixto</strong> combina serie y paralelo. Has dominado ambos por separado, ahora toca mezclarlos.</p>
              <p>Nuestro circuito: <strong>R1=220Ω en serie</strong> con <strong>R2=1kΩ ‖ R3=1kΩ</strong> (paralelo).</p>
            </TheoryBlock>

            <TheoryBlock title="El Método de 5 Pasos" pageRef="10-11" color={COLOR}>
              <div className="space-y-2">
                <p>🟦 <strong>Paso 1: Calcular R<sub>T</sub></strong> — Simplifica el paralelo, luego suma en serie</p>
                <p>🟩 <strong>Paso 2: Calcular I<sub>T</sub></strong> — I = V/R con la R total</p>
                <p>🟨 <strong>Paso 3: Identificar magnitudes iguales</strong> — ¿Qué es igual en serie? ¿Y en paralelo?</p>
                <p>🟧 <strong>Paso 4: Ohm por partes</strong> — Calcular V e I de cada componente</p>
                <p>🟥 <strong>Paso 5: Potencia</strong> — P = V × I para cada uno</p>
              </div>
            </TheoryBlock>

            <TheoryBlock title="Ejemplo resuelto" color={COLOR}>
              <p>R1=220Ω + (R2=1kΩ ‖ R3=1kΩ), V<sub>T</sub>=10V</p>
              <p>1️⃣ R<sub>par</sub> = 500Ω → R<sub>T</sub> = 220+500 = <strong>720Ω</strong></p>
              <p>2️⃣ I<sub>T</sub> = 10/720 = <strong>13,9mA</strong></p>
              <p>3️⃣ I es igual en serie (R1 y el bloque), V es igual en paralelo (R2=R3)</p>
              <p>4️⃣ V1 = 13,9mA × 220Ω = <strong>3,06V</strong>, V<sub>par</sub> = 10−3,06 = <strong>6,94V</strong></p>
              <p>5️⃣ P<sub>T</sub> = 10 × 13,9mA = <strong>139mW</strong></p>
            </TheoryBlock>

            <DynamicCircuitTable values={CIRCUIT} revealed={new Set(Object.keys(CIRCUIT))} />

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(7, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <>
            <DynamicCircuitTable values={CIRCUIT} revealed={revealed} />
            <QuizCard
              questions={QUIZZES[7]}
              onComplete={() => {
                setRevealed(new Set(Object.keys(CIRCUIT)))
                progress.completePhase(7, 'demuestra')
                setActivePhase('construye')
              }}
              color={COLOR}
            />
          </>
        )}

        {activePhase === 'construye' && (
          <div className="space-y-3">
            <WarningBox>Fuente APAGADA. Vas a montar el circuito mixto del jefe final.</WarningBox>

            <BuildStep step={1} color={COLOR}>
              <p><strong>Coloca R1 (220Ω)</strong> desde el rail + a una fila intermedia de la breadboard.</p>
            </BuildStep>
            <BuildStep step={2} color={COLOR}>
              <p><strong>Coloca R2 (1kΩ)</strong> desde esa fila intermedia al rail −.</p>
            </BuildStep>
            <BuildStep step={3} color={COLOR}>
              <p><strong>Coloca R3 (1kΩ)</strong> en paralelo con R2: entre los mismos dos puntos.</p>
            </BuildStep>
            <BuildStep step={4} color={COLOR}>
              <p><strong>Conecta la fuente</strong> y enciéndela.</p>
            </BuildStep>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(7, 'construye'); setActivePhase('comprueba') }}
            >
              ¡Circuito mixto montado! Vamos a medir →
            </Button>
          </div>
        )}

        {activePhase === 'comprueba' && (
          <div className="space-y-4">
            <TheoryBlock title="Verifica el método de 5 pasos con medidas reales" color={COLOR}>
              <p>Mide cada valor y compáralo con el cálculo teórico.</p>
            </TheoryBlock>

            <MeasureChecklist
              items={[
                { label: 'V total (fuente)', expected: 10, unit: 'V' },
                { label: 'V en R1 (220Ω)', expected: 3.06, unit: 'V' },
                { label: 'V en R2 o R3 (paralelo)', expected: 6.94, unit: 'V' },
                { label: 'I total', expected: 13.9, unit: 'mA' },
                { label: 'I en R2', expected: 6.94, unit: 'mA' },
              ]}
              onAllChecked={() => { progress.completePhase(7, 'comprueba'); onComplete() }}
              color={COLOR}
            />
          </div>
        )}
      </div>
    </div>
  )
}
