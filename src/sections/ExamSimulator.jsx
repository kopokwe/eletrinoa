import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import DynamicCircuitTable from '@/components/DynamicCircuitTable'
import { seriesR, parallelR, ohmI, power as calcPower } from '@/lib/physics'
import { isWithinTolerance } from '@/lib/physics'

const R_VALUES = [100, 220, 330, 470, 1000, 2200, 4700, 10000]
const V_VALUES = [3, 5, 9, 10, 12]

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generateCircuit(level) {
  const vt = pickRandom(V_VALUES)

  if (level === 1) {
    // Series
    const count = 2 + Math.floor(Math.random() * 2) // 2-3
    const resistors = Array.from({ length: count }, () => pickRandom(R_VALUES))
    const rt = seriesR(resistors)
    const it = ohmI(vt, rt)
    return { type: 'serie', vt, resistors, rt, it, level }
  }

  if (level === 2) {
    // Parallel
    const count = 2 + Math.floor(Math.random() * 2) // 2-3
    const resistors = Array.from({ length: count }, () => pickRandom(R_VALUES))
    const rt = parallelR(resistors)
    const it = ohmI(vt, rt)
    return { type: 'paralelo', vt, resistors, rt, it, level }
  }

  // Mixed: R1 in series with (R2 || R3)
  const r1 = pickRandom(R_VALUES)
  const r2 = pickRandom(R_VALUES)
  const r3 = pickRandom(R_VALUES)
  const rPar = parallelR([r2, r3])
  const rt = r1 + rPar
  const it = ohmI(vt, rt)
  const v1 = it * r1
  const vPar = vt - v1
  const i2 = ohmI(vPar, r2)
  const i3 = ohmI(vPar, r3)

  return {
    type: 'mixto', vt, resistors: [r1, r2, r3], rt, it,
    rPar, v1, vPar, i2, i3, level,
    pt: vt * it, p1: v1 * it, p2: vPar * i2, p3: vPar * i3,
  }
}

export default function ExamSimulator({ onBack, addExamScore, getExamScores, unlockAchievement }) {
  const [level, setLevel] = useState(null)
  const [circuit, setCircuit] = useState(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const scores = getExamScores()
  const highScores = scores.filter((s) => s.score >= 80)

  const startExam = useCallback((lv) => {
    setLevel(lv)
    setCircuit(generateCircuit(lv))
    setStep(0)
    setAnswers({})
    setScore(0)
    setFinished(false)
  }, [])

  const handleAnswer = useCallback((key, expected, value) => {
    const correct = isWithinTolerance(expected, Number(value))
    setAnswers((prev) => ({ ...prev, [key]: { value: Number(value), correct } }))
    if (correct) setScore((s) => s + 1)
    setStep((s) => s + 1)
  }, [])

  const finishExam = useCallback(() => {
    const totalSteps = level === 3 ? 5 : 2
    const pct = Math.round((score / totalSteps) * 100)
    addExamScore(pct, level)
    setFinished(true)

    // Check if 3 exams with ≥80%
    const allScores = [...getExamScores(), { score: pct }]
    if (allScores.filter((s) => s.score >= 80).length >= 3) {
      unlockAchievement('lista_examen')
    }
  }, [score, level, addExamScore, getExamScores, unlockAchievement])

  // Level selection
  if (!circuit) {
    return (
      <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver
        </Button>

        <h1 className="text-xl font-bold mb-2">📝 Simulacro de examen</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Exámenes completados: {scores.length} | Con ≥80%: {highScores.length}/3
        </p>

        <div className="space-y-3">
          <Card className="cursor-pointer hover:border-foreground/20" onClick={() => startExam(1)}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Nivel 1 — Serie</h3>
                  <p className="text-xs text-muted-foreground">2-3 resistencias en serie</p>
                </div>
                <Badge>Fácil</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-foreground/20" onClick={() => startExam(2)}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Nivel 2 — Paralelo</h3>
                  <p className="text-xs text-muted-foreground">2-3 resistencias en paralelo</p>
                </div>
                <Badge variant="secondary">Medio</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-foreground/20" onClick={() => startExam(3)}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Nivel 3 — Mixto</h3>
                  <p className="text-xs text-muted-foreground">Serie + paralelo (como el examen real)</p>
                </div>
                <Badge variant="destructive">Difícil</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {scores.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold mb-2">Historial</h2>
            <div className="space-y-1">
              {scores.slice(-5).reverse().map((s, i) => (
                <div key={i} className="flex justify-between text-xs bg-secondary/50 rounded p-2">
                  <span>Nivel {s.level}</span>
                  <span className={s.score >= 80 ? 'text-green-400' : 'text-red-400'}>{s.score}%</span>
                  <span className="text-muted-foreground">{s.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Exam in progress
  const { type, vt, resistors, rt, it } = circuit

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={() => { setCircuit(null); setLevel(null) }} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Salir
      </Button>

      <h2 className="text-lg font-bold mb-2">
        Circuito {type} — Nivel {level}
      </h2>

      {/* Circuit description */}
      <Card className="mb-4">
        <CardContent className="pt-4 text-sm space-y-1">
          <p><strong>V<sub>T</sub> = {vt}V</strong></p>
          {resistors.map((r, i) => (
            <p key={i}>R{i + 1} = {r >= 1000 ? `${r / 1000}kΩ` : `${r}Ω`}</p>
          ))}
          <p className="text-xs text-muted-foreground">
            {type === 'serie' && 'Todas en serie'}
            {type === 'paralelo' && 'Todas en paralelo'}
            {type === 'mixto' && 'R1 en serie con (R2 ‖ R3)'}
          </p>
        </CardContent>
      </Card>

      {/* Step-by-step input */}
      <div className="space-y-3">
        {/* Step 1: RT */}
        <StepInput
          label="Paso 1: ¿Cuánto es RT?"
          unit="Ω"
          expected={rt}
          answered={answers.rt}
          active={step === 0}
          onSubmit={(v) => handleAnswer('rt', rt, v)}
        />

        {/* Step 2: IT */}
        <StepInput
          label="Paso 2: ¿Cuánto es IT?"
          unit="mA"
          expected={it * 1000}
          answered={answers.it}
          active={step === 1}
          onSubmit={(v) => handleAnswer('it', it * 1000, v)}
        />

        {step >= 2 && !finished && (
          <Button onClick={finishExam} className="w-full">
            Ver resultado
          </Button>
        )}

        {finished && (
          <Card>
            <CardContent className="pt-6 text-center space-y-3">
              <div className="text-4xl">{score >= 2 ? '🎉' : '💪'}</div>
              <p className="text-xl font-bold">
                {Math.round((score / (level === 3 ? 5 : 2)) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">
                R<sub>T</sub> = {Math.round(rt * 100) / 100}{rt >= 1000 ? `Ω (${(rt/1000).toFixed(1)}kΩ)` : 'Ω'} | I<sub>T</sub> = {(it * 1000).toFixed(1)}mA
              </p>
              <div className="flex gap-2">
                <Button onClick={() => startExam(level)} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-1" /> Otro ejercicio
                </Button>
                <Button variant="outline" onClick={() => { setCircuit(null); setLevel(null) }} className="flex-1">
                  Volver
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function StepInput({ label, unit, expected, answered, active, onSubmit }) {
  const [value, setValue] = useState('')

  if (answered) {
    return (
      <Card className={answered.correct ? 'border-green-500/50' : 'border-red-500/50'}>
        <CardContent className="pt-3">
          <p className="text-sm font-medium">{label}</p>
          <p className={`text-sm ${answered.correct ? 'text-green-400' : 'text-red-400'}`}>
            Tu respuesta: {answered.value}{unit} {answered.correct ? '✅' : `❌ (correcto: ${Math.round(expected * 100) / 100}${unit})`}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!active) {
    return (
      <Card className="opacity-40">
        <CardContent className="pt-3">
          <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-3 space-y-2">
        <p className="text-sm font-medium">{label}</p>
        <div className="flex gap-2">
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-secondary text-foreground rounded px-3 py-2 text-sm flex-1 border border-input"
            placeholder="Tu respuesta"
            autoFocus
          />
          <span className="text-sm text-muted-foreground self-center">{unit}</span>
          <Button size="sm" onClick={() => value && onSubmit(value)}>OK</Button>
        </div>
      </CardContent>
    </Card>
  )
}
