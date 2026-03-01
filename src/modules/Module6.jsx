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

const COLOR = '#4ade80'

export default function Module6({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(6)
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye', 'comprueba']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(6, p))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        🔀 Módulo 6: Autopista de electrones
      </h1>
      <p className="text-sm text-muted-foreground mb-4">Circuitos paralelo + reparto de corriente</p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="Circuito en paralelo" pageRef="4-6" color={COLOR}>
              <p>En un circuito <strong>paralelo</strong>, los componentes están conectados como carriles de una autopista: la corriente puede ir por cualquier camino.</p>
              <div className="bg-secondary/50 rounded p-3 space-y-1">
                <p className="font-mono"><strong>1/R<sub>T</sub> = 1/R1 + 1/R2 + ...</strong></p>
                <p className="font-mono text-sm">Para 2 R: R<sub>T</sub> = (R1 × R2) / (R1 + R2)</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">R<sub>T</sub> siempre es MENOR que la menor resistencia individual.</p>
            </TheoryBlock>

            <TheoryBlock title="Reglas del paralelo" pageRef="4-5" color={COLOR}>
              <p>🔑 <strong>El voltaje es IGUAL</strong> en todas las ramas (todas conectadas a los mismos puntos)</p>
              <p>🔑 <strong>La corriente se REPARTE</strong> entre las ramas (más corriente por la menor R)</p>
              <p>Es lo contrario del serie: aquí se reparte la I, no la V.</p>
            </TheoryBlock>

            <TheoryBlock title="Serie vs Paralelo — Comparación" color={COLOR}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1"></th>
                      <th className="text-center py-1">Serie</th>
                      <th className="text-center py-1">Paralelo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50"><td className="py-1">R<sub>T</sub></td><td className="text-center">Se suman</td><td className="text-center">Fórmula inversa</td></tr>
                    <tr className="border-b border-border/50"><td className="py-1">I</td><td className="text-center">Igual en todas</td><td className="text-center">Se reparte</td></tr>
                    <tr><td className="py-1">V</td><td className="text-center">Se reparte</td><td className="text-center">Igual en todas</td></tr>
                  </tbody>
                </table>
              </div>
            </TheoryBlock>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(6, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[6]}
            onComplete={() => { progress.completePhase(6, 'demuestra'); setActivePhase('construye') }}
            color={COLOR}
          />
        )}

        {activePhase === 'construye' && (
          <div className="space-y-3">
            <WarningBox>Fuente APAGADA antes de montar.</WarningBox>

            <BuildStep step={1} color={COLOR}>
              <p><strong>Busca 2 resistencias</strong> de ~1kΩ de tu bolsa clasificada.</p>
            </BuildStep>
            <BuildStep step={2} color={COLOR}>
              <p><strong>Conéctalas en paralelo</strong>: ambas van entre los mismos dos puntos (cable desde <strong>columna A</strong> y cable a <strong>columna L</strong>).</p>
            </BuildStep>
            <BuildStep step={3} color={COLOR}>
              <p><strong>Conecta la fuente</strong> (ya debería estar en columnas A y L).</p>
            </BuildStep>
            <BuildStep step={4} color={COLOR}>
              <p><strong>Enciende</strong> y verifica 10V.</p>
            </BuildStep>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(6, 'construye'); setActivePhase('comprueba') }}
            >
              ¡Circuito montado! Vamos a medir →
            </Button>
          </div>
        )}

        {activePhase === 'comprueba' && (
          <div className="space-y-4">
            <TheoryBlock title="Mide voltajes y corrientes" color={COLOR}>
              <p>En paralelo: V debe ser igual en ambas ramas. I se reparte a partes iguales (R1=R2).</p>
            </TheoryBlock>

            <MeasureChecklist
              items={[
                { label: 'V en R1', expected: 10, unit: 'V' },
                { label: 'V en R2', expected: 10, unit: 'V' },
                { label: 'I en R1', expected: 10, unit: 'mA' },
                { label: 'I en R2', expected: 10, unit: 'mA' },
                { label: 'I total', expected: 20, unit: 'mA' },
              ]}
              onAllChecked={() => { progress.completePhase(6, 'comprueba'); onComplete() }}
              color={COLOR}
            />
          </div>
        )}
      </div>
    </div>
  )
}
