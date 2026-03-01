import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react'

export default function QuizCard({ questions, onComplete, requiredScore = 0.75, color }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [streak, setStreak] = useState(0)

  const question = questions[currentQ]

  const handleSelect = useCallback((idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (questions[currentQ].options[idx].correct) {
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
  }, [selected, currentQ, questions])

  const handleNext = useCallback(() => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1)
      setSelected(null)
      setShowHint(false)
    } else {
      setFinished(true)
      const finalScore = selected !== null && questions[currentQ].options[selected].correct
        ? score + 0 // already counted
        : score
      const pct = score / questions.length
      if (pct >= requiredScore && onComplete) {
        onComplete(score, questions.length)
      }
    }
  }, [currentQ, questions, selected, score, requiredScore, onComplete])

  const handleRetry = useCallback(() => {
    setCurrentQ(0)
    setSelected(null)
    setShowHint(false)
    setScore(0)
    setFinished(false)
    setStreak(0)
  }, [])

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    const passed = score / questions.length >= requiredScore
    return (
      <Card>
        <CardContent className="pt-6 text-center space-y-4">
          <div className="text-5xl">{passed ? '🎉' : '💪'}</div>
          <p className="text-2xl font-bold">
            {score}/{questions.length} ({pct}%)
          </p>
          <p className="text-muted-foreground">
            {passed
              ? '¡Genial! Has demostrado que lo entiendes.'
              : `Necesitas al menos ${Math.round(requiredScore * 100)}% para avanzar. ¡Inténtalo de nuevo!`}
          </p>
          {!passed && (
            <Button onClick={handleRetry} style={{ backgroundColor: color }}>
              Intentar de nuevo
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            Pregunta {currentQ + 1}/{questions.length}
          </Badge>
          {streak >= 3 && <Badge className="bg-amber-500 text-white">🔥 Racha ×{streak}</Badge>}
        </div>
        <CardTitle className="text-base mt-2">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {question.hint && !showHint && selected === null && (
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-400"
            onClick={() => setShowHint(true)}
          >
            <Lightbulb className="h-4 w-4 mr-1" /> Pista
          </Button>
        )}
        {showHint && (
          <p className="text-sm text-amber-400 bg-amber-400/10 p-2 rounded">
            💡 {question.hint}
          </p>
        )}

        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx
            const showResult = selected !== null
            let variant = 'outline'
            let extraClass = 'justify-start text-left h-auto py-3 px-4'
            if (showResult && opt.correct) {
              extraClass += ' border-green-500 bg-green-500/10'
            } else if (showResult && isSelected && !opt.correct) {
              extraClass += ' border-red-500 bg-red-500/10'
            }

            return (
              <Button
                key={idx}
                variant={variant}
                className={`w-full ${extraClass}`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                <span className="flex items-start gap-2 w-full">
                  {showResult && opt.correct && <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />}
                  {showResult && isSelected && !opt.correct && <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                  <span>{opt.label}</span>
                </span>
              </Button>
            )
          })}
        </div>

        {selected !== null && (
          <div className={`text-sm p-3 rounded mt-2 ${
            question.options[selected].correct
              ? 'bg-green-500/10 text-green-300'
              : 'bg-red-500/10 text-red-300'
          }`}>
            {question.options[selected].feedback}
          </div>
        )}

        {selected !== null && (
          <Button onClick={handleNext} className="w-full mt-2" style={{ backgroundColor: color }}>
            {currentQ + 1 < questions.length ? (
              <>Siguiente <ArrowRight className="ml-1 h-4 w-4" /></>
            ) : (
              'Ver resultado'
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
