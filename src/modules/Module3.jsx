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

const COLOR = '#f472b6'

export default function Module3({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress(3)
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye', 'comprueba']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked(3, p))

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        💡 Módulo 3: Tu primer circuito
      </h1>
      <p className="text-sm text-muted-foreground mb-4">LED + diodo + Ley de Ohm</p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="¿Qué es un diodo?" pageRef="10" color={COLOR}>
              <p>Un diodo es como una <strong>válvula de un solo sentido</strong>: deja pasar la corriente en una dirección pero la bloquea en la otra.</p>
              <p><strong>Polarización directa</strong> (ánodo→cátodo): la corriente fluye ✅</p>
              <p><strong>Polarización inversa</strong> (cátodo→ánodo): bloqueado ❌</p>
            </TheoryBlock>

            <TheoryBlock title="El LED — un diodo que brilla" pageRef="10" color={COLOR}>
              <p>LED = Light Emitting Diode. Es un diodo que <strong>emite luz</strong> cuando pasa corriente.</p>
              <p><strong>Pata larga</strong> = Ánodo (+)</p>
              <p><strong>Pata corta</strong> = Cátodo (−) — Truco: <em>corta = cátodo</em></p>
              <p>Un LED rojo necesita ~<strong>2V</strong> y ~<strong>20mA</strong> para funcionar bien.</p>
            </TheoryBlock>

            <TheoryBlock title="¿Por qué necesita una resistencia?" pageRef="10" color={COLOR}>
              <p>Sin resistencia, el LED recibe <strong>demasiada corriente</strong> y se quema. La resistencia limita la corriente.</p>
              <div className="bg-secondary/50 rounded p-3 text-center space-y-1">
                <p className="font-mono">V<sub>R</sub> = V<sub>fuente</sub> − V<sub>LED</sub></p>
                <p className="font-mono text-lg"><strong>R = V<sub>R</sub> / I</strong></p>
              </div>
              <p className="mt-2">Con 10V de fuente: R = (10−2)/0,02 = <strong>400Ω</strong></p>
              <p className="text-xs text-muted-foreground">En la práctica usarías 330Ω o 470Ω (valores comerciales más cercanos).</p>
            </TheoryBlock>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(3, 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos al quiz →
            </Button>
          </>
        )}

        {activePhase === 'demuestra' && (
          <QuizCard
            questions={QUIZZES[3]}
            onComplete={() => { progress.completePhase(3, 'demuestra'); setActivePhase('construye') }}
            color={COLOR}
          />
        )}

        {activePhase === 'construye' && (
          <div className="space-y-3">
            <WarningBox>
              <strong>Antes de empezar:</strong> Asegúrate de que la fuente Mean Well está APAGADA. Nunca montes con corriente.
            </WarningBox>

            <TheoryBlock title="Tu breadboard Ariston" pageRef="Proyecto" color={COLOR}>
              <p>Tu Ariston tiene <strong>12 columnas</strong> (A–L) y ~46 filas, con un canal central que separa el lado izquierdo (G–L) del derecho (A–F).</p>
              <div className="bg-secondary/50 rounded p-3 mt-2 font-mono text-xs space-y-2">
                <p><strong className="text-red-400">Columna A</strong> (borde derecho) = tu <strong>+V</strong> — cable rojo de la Mean Well aquí</p>
                <p><strong className="text-blue-400">Columna L</strong> (borde izquierdo) = tu <strong>−</strong> — cable negro de la Mean Well aquí</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Cada fila tiene 5 agujeros conectados entre sí por lado: B,C,D,E,F (derecha) y G,H,I,J,K (izquierda). Las columnas A y L son los buses de alimentación — recorren toda la placa como las tiras rojas/azules de las breadboards modernas.
              </p>
              <div className="bg-secondary/30 rounded p-2 mt-2 font-mono text-[10px] text-muted-foreground text-center whitespace-pre leading-relaxed">
{`L  K J I H G │ F E D C B  A
−  · · · · · │ · · · · ·  +
   ─────────   ─────────
   conectados   conectados`}
              </div>
            </TheoryBlock>

            <BuildStep step={1} color={COLOR}>
              <p><strong>Conecta la fuente</strong>: cable rojo a la <strong>columna A</strong> (+), cable negro a la <strong>columna L</strong> (−). NO enciendas todavía.</p>
            </BuildStep>

            <BuildStep step={2} color={COLOR} warning="Revisa la polaridad: pata larga al lado del +">
              <p><strong>Coloca el LED</strong> en la breadboard. Pata larga (ánodo +) hacia la fila conectada a la resistencia.</p>
            </BuildStep>

            <BuildStep step={3} color={COLOR}>
              <p><strong>Coloca la resistencia</strong> (~330Ω o 470Ω de tu bolsa) conectando el ánodo del LED al <strong>+</strong> (tira un cable desde la columna A).</p>
            </BuildStep>

            <BuildStep step={4} color={COLOR}>
              <p><strong>Conecta el cátodo</strong> (pata corta del LED) al <strong>−</strong> (tira un cable a la columna L).</p>
            </BuildStep>

            <BuildStep step={5} color={COLOR}>
              <p><strong>Enciende la fuente</strong>. El LED debería encenderse. Si no brilla, revisa la polaridad (dale la vuelta al LED).</p>
            </BuildStep>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase(3, 'construye'); setActivePhase('comprueba') }}
            >
              ¡Mi LED brilla! Vamos a medir →
            </Button>
          </div>
        )}

        {activePhase === 'comprueba' && (
          <div className="space-y-4">
            <TheoryBlock title="Comprueba tu circuito con el Venlab" color={COLOR}>
              <p>Mide estos valores y compáralos con lo esperado. Usa el modo correcto del polimetro para cada medida.</p>
            </TheoryBlock>

            <MeasureChecklist
              items={[
                { label: 'Voltaje en el LED (V_LED)', expected: 2, unit: 'V' },
                { label: 'Voltaje en la resistencia (V_R)', expected: 8, unit: 'V' },
                { label: 'Corriente del circuito (I)', expected: 20, unit: 'mA' },
              ]}
              onAllChecked={() => { progress.completePhase(3, 'comprueba'); onComplete() }}
              color={COLOR}
            />
          </div>
        )}
      </div>
    </div>
  )
}
