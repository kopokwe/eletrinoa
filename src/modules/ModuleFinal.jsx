import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PhaseNavigation from '@/components/PhaseNavigation'
import TheoryBlock from '@/components/TheoryBlock'
import BuildStep from '@/components/BuildStep'
import WarningBox from '@/components/WarningBox'
import MeasureChecklist from '@/components/MeasureChecklist'
import Seg7Display, { DIGIT_SEGMENTS } from '@/components/Seg7Display'
import Seg7PinMap from '@/components/Seg7PinMap'

const COLOR = '#c084fc'

export default function ModuleFinal({ onBack, onComplete, progress }) {
  const mod = progress.getModuleProgress('final')
  const [activePhase, setActivePhase] = useState('entiende')
  const phases = ['entiende', 'demuestra', 'construye', 'comprueba']
  const unlockedPhases = phases.filter((p) => progress.isPhaseUnlocked('final', p))

  // Interactive digit selector for Entiende phase
  const [selectedDigit, setSelectedDigit] = useState(8)
  // Pin map help toggle for Demuestra phase
  const [showPinHelp, setShowPinHelp] = useState(false)
  // Build level tracker for Construye phase
  const [buildLevel, setBuildLevel] = useState(1)

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1" style={{ color: COLOR }}>
        🔢 Proyecto Final: Hackea el Display
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        Todo lo aprendido en un solo proyecto: display de 7 segmentos
      </p>

      <PhaseNavigation
        phases={phases} activePhase={activePhase} completedPhases={mod.phases}
        unlockedPhases={unlockedPhases} onSelect={setActivePhase} color={COLOR}
      />

      <div className="mt-4 space-y-4">
        {/* ─── FASE 1: ENTIENDE ─── */}
        {activePhase === 'entiende' && (
          <>
            <TheoryBlock title="El display TDSR 5160 G" pageRef="Proyecto" color={COLOR}>
              <p>Tu display tiene <strong>7 segmentos</strong> (a–g) + punto decimal (dp).</p>
              <p>Cada segmento es un <strong>LED individual</strong> — como el del Módulo 3.</p>
              <p>Tipo: <strong>cátodo común</strong> — todos los LEDs comparten GND.</p>
              <p className="text-xs text-muted-foreground mt-2">10 pines: 2 comunes (cátodo) + 7 segmentos + 1 punto decimal</p>
            </TheoryBlock>

            <TheoryBlock title="Mapa de segmentos" color={COLOR}>
              <div className="flex items-center justify-center gap-6 py-2">
                <Seg7Display
                  activeSegments={DIGIT_SEGMENTS[selectedDigit] || []}
                  showLabels
                  activeColor={COLOR}
                  size={140}
                />
                <div className="text-6xl font-bold" style={{ color: COLOR }}>
                  {selectedDigit}
                </div>
              </div>
              <div className="flex gap-1 flex-wrap justify-center mt-3">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDigit(d)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                      selectedDigit === d
                        ? 'text-white'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                    style={selectedDigit === d ? { backgroundColor: COLOR } : undefined}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Toca un número para ver qué segmentos se encienden
              </p>
            </TheoryBlock>

            <TheoryBlock title="Tabla de segmentos por número" color={COLOR}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-1 text-left">Nº</th>
                      <th className="py-1 text-left">Segmentos</th>
                      <th className="py-1 text-right">Resistencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(DIGIT_SEGMENTS).map(([digit, segs]) => (
                      <tr
                        key={digit}
                        className={`border-b border-border/50 ${
                          Number(digit) === selectedDigit ? 'bg-purple-500/10' : ''
                        }`}
                      >
                        <td className="py-1 font-bold">{digit}</td>
                        <td className="py-1 font-mono text-muted-foreground">{segs.join(', ')}</td>
                        <td className="py-1 text-right">{segs.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TheoryBlock>

            <TheoryBlock title="R por segmento (igual que Módulo 3)" pageRef="3, 10" color={COLOR}>
              <div className="bg-secondary/50 rounded p-3 text-center space-y-1">
                <p className="font-mono">R = (V<sub>T</sub> − V<sub>LED</sub>) / I</p>
                <p className="font-mono">R = (10 − 2) / 0,02 = <strong>400Ω</strong></p>
                <p className="text-sm">→ Usamos <strong>330Ω</strong> (valor comercial más cercano)</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Cada segmento necesita su propia R porque cada uno es un circuito independiente.
                Son 7 circuitos en paralelo que comparten el cátodo.
              </p>
            </TheoryBlock>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase('final', 'entiende'); setActivePhase('demuestra') }}
            >
              ¡Entendido! Vamos a explorar el display →
            </Button>
          </>
        )}

        {/* ─── FASE 2: EXPLORA EL DISPLAY ─── */}
        {activePhase === 'demuestra' && (
          <>
            <TheoryBlock title="Mapea los pines de tu display" color={COLOR}>
              <p>Antes de conectar nada, vas a <strong>descubrir qué pin controla qué segmento</strong>.</p>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-sm">
                <li>Pon el Venlab en <strong>modo DIODO</strong> (símbolo →|)</li>
                <li>Identifica los pines <strong>COMUNES</strong>: prueba combinaciones. Los pines comunes darán lectura con muchos otros.</li>
                <li>Para cada pin no-común, anota <strong>qué segmento se ilumina</strong> débilmente.</li>
                <li>Dibuja tu mapa: "Pin 1 = segmento e, Pin 2 = segmento d, etc."</li>
              </ol>
            </TheoryBlock>

            <WarningBox>
              Tómate tu tiempo con esta actividad. Es normal que lleve unos minutos encontrar todos los pines. Si te atascas más de 5 minutos, usa la ayuda de abajo.
            </WarningBox>

            <div className="bg-card rounded-lg p-4 border border-border">
              <button
                onClick={() => setShowPinHelp(!showPinHelp)}
                className="w-full flex items-center justify-between text-sm"
              >
                <span className={showPinHelp ? 'text-purple-400' : 'text-muted-foreground'}>
                  {showPinHelp ? '🗺️ Mapa de referencia' : '🆘 ¿Necesitas ayuda?'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {showPinHelp ? 'Ocultar' : 'Ver mapa'}
                </span>
              </button>

              {showPinHelp && (
                <div className="mt-3 pt-3 border-t border-border">
                  <Seg7PinMap color={COLOR} />
                </div>
              )}
            </div>

            <Button
              className="w-full" style={{ backgroundColor: COLOR }}
              onClick={() => { progress.completePhase('final', 'demuestra'); setActivePhase('construye') }}
            >
              ¡Todos los pines mapeados! Vamos a construir →
            </Button>
          </>
        )}

        {/* ─── FASE 3: CONSTRUYE ─── */}
        {activePhase === 'construye' && (
          <div className="space-y-3">
            {/* Level selector */}
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  onClick={() => setBuildLevel(level)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    buildLevel === level
                      ? 'text-white'
                      : buildLevel > level
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                  style={buildLevel === level ? { backgroundColor: COLOR } : undefined}
                >
                  {level <= 3 ? `Nivel ${level}` : 'BONUS'}
                </button>
              ))}
            </div>

            {buildLevel === 1 && (
              <>
                <h3 className="text-sm font-bold" style={{ color: COLOR }}>
                  Nivel 1: Enciende UN segmento
                </h3>
                <div className="flex justify-center py-2">
                  <Seg7Display activeSegments={['a']} activeColor={COLOR} size={100} showLabels />
                </div>
                <BuildStep step={1} color={COLOR}>
                  <p>Pincha el display en la breadboard <strong>a caballo del surco central</strong>.</p>
                </BuildStep>
                <BuildStep step={2} color={COLOR}>
                  <p>Identifica un pin de <strong>cátodo común</strong> (pin 3 o 8) → cable al raíl −</p>
                </BuildStep>
                <BuildStep step={3} color={COLOR}>
                  <p>Elige un pin de segmento → <strong>R de 330Ω</strong> → raíl +</p>
                </BuildStep>
                <BuildStep step={4} color={COLOR}>
                  <p>¿Se enciende? <strong>¡Primer segmento!</strong></p>
                </BuildStep>
                <Button
                  className="w-full" style={{ backgroundColor: COLOR }}
                  onClick={() => setBuildLevel(2)}
                >
                  ¡Funciona! Siguiente nivel →
                </Button>
              </>
            )}

            {buildLevel === 2 && (
              <>
                <h3 className="text-sm font-bold" style={{ color: COLOR }}>
                  Nivel 2: Forma el número "1"
                </h3>
                <div className="flex justify-center py-2">
                  <Seg7Display activeSegments={['b', 'c']} activeColor={COLOR} size={100} showLabels />
                </div>
                <BuildStep step={1} color={COLOR}>
                  <p>Conecta el <strong>segmento b</strong> con su propia R de 330Ω al raíl +</p>
                </BuildStep>
                <BuildStep step={2} color={COLOR}>
                  <p>Conecta el <strong>segmento c</strong> con otra R de 330Ω al raíl +</p>
                </BuildStep>
                <p className="text-xs text-muted-foreground text-center">
                  Solo 2 resistencias necesarias para el "1"
                </p>
                <Button
                  className="w-full" style={{ backgroundColor: COLOR }}
                  onClick={() => setBuildLevel(3)}
                >
                  ¡El "1" se ve! Siguiente →
                </Button>
              </>
            )}

            {buildLevel === 3 && (
              <>
                <h3 className="text-sm font-bold" style={{ color: COLOR }}>
                  Nivel 3: Forma el número "7"
                </h3>
                <div className="flex justify-center py-2">
                  <Seg7Display activeSegments={['a', 'b', 'c']} activeColor={COLOR} size={100} showLabels />
                </div>
                <BuildStep step={1} color={COLOR}>
                  <p>Mantén b y c conectados. Añade el <strong>segmento a</strong> con su R de 330Ω.</p>
                </BuildStep>
                <p className="text-xs text-muted-foreground text-center">
                  3 resistencias → ¡El número 7 aparece!
                </p>
                <Button
                  className="w-full" style={{ backgroundColor: COLOR }}
                  onClick={() => setBuildLevel(4)}
                >
                  ¡Perfecto! Último nivel →
                </Button>
              </>
            )}

            {buildLevel === 4 && (
              <>
                <h3 className="text-sm font-bold" style={{ color: COLOR }}>
                  Nivel 4: El "8" completo (¡todos los segmentos!)
                </h3>
                <div className="flex justify-center py-2">
                  <Seg7Display activeSegments={['a','b','c','d','e','f','g']} activeColor={COLOR} size={100} showLabels />
                </div>
                <BuildStep step={1} color={COLOR}>
                  <p>Conecta los segmentos restantes: <strong>d, e, f, g</strong> — cada uno con su R de 330Ω.</p>
                </BuildStep>
                <BuildStep step={2} color={COLOR}>
                  <p>Ahora tienes <strong>7 resistencias</strong> y el "8" completo. Este es el circuito final.</p>
                </BuildStep>

                <WarningBox>
                  <strong>BONUS:</strong> Sustituye la conexión directa de UN segmento por: pot → R → segmento. Al girar el pot, ese segmento se atenúa. ¡Has hecho un dimmer!
                </WarningBox>

                <Button
                  className="w-full" style={{ backgroundColor: COLOR }}
                  onClick={() => { progress.completePhase('final', 'construye'); setActivePhase('comprueba') }}
                >
                  ¡Circuito completo! Vamos a medir →
                </Button>
              </>
            )}
          </div>
        )}

        {/* ─── FASE 4: COMPRUEBA ─── */}
        {activePhase === 'comprueba' && (
          <div className="space-y-4">
            <TheoryBlock title="Mide tu circuito completo" color={COLOR}>
              <p>Con todos los segmentos encendidos ("8"), comprueba estas medidas:</p>
            </TheoryBlock>

            <MeasureChecklist
              items={[
                { label: 'V en 1 segmento encendido', expected: 2, unit: 'V' },
                { label: 'V en su resistencia de 330Ω', expected: 8, unit: 'V' },
                { label: 'I por 1 segmento', expected: 24, unit: 'mA' },
                { label: 'I total con 7 segmentos', expected: 168, unit: 'mA' },
              ]}
              onAllChecked={() => {
                progress.completePhase('final', 'comprueba')
                onComplete()
              }}
              color={COLOR}
            />

            <TheoryBlock title="Verifica Kirchhoff" color={COLOR}>
              <p className="text-sm">¿V<sub>segmento</sub> + V<sub>resistencia</sub> ≈ 10V?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Si sí, has comprobado la Ley de Kirchhoff: la suma de las caídas de voltaje en un circuito
                cerrado es igual a la tensión de la fuente.
              </p>
            </TheoryBlock>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 text-center space-y-2">
              <p className="text-lg">🎉</p>
              <p className="text-sm font-semibold">
                Has aplicado: Ley de Ohm (×7), cálculo de R para diodos,
                circuitos en paralelo, y medición con polimetro.
              </p>
              <p className="text-xs text-muted-foreground">
                Todo lo de tus 12 páginas de apuntes en un solo proyecto.
                Así funcionan los marcadores de los campos de fútbol, los relojes digitales,
                y los displays de las gasolineras.
              </p>
              <p className="text-xs text-purple-400 mt-3">
                🚀 PRÓXIMO NIVEL: Cuando llegue el kit Freenove ESP32, podrás programar este
                display para que cuente automáticamente del 0 al 9. Tu primer proyecto con código.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
