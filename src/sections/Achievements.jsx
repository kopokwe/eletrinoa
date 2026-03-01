import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Lock } from 'lucide-react'
import { ACHIEVEMENTS } from '@/data/achievements'

export default function Achievements({ onBack, achievements }) {
  const unlocked = new Set(achievements)

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-2">🏆 Logros</h1>
      <p className="text-sm text-muted-foreground mb-4">
        {unlocked.size}/{ACHIEVEMENTS.length} desbloqueados
      </p>

      <div className="grid grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlocked.has(ach.id)
          return (
            <Card key={ach.id} className={!isUnlocked ? 'opacity-40' : ''}>
              <CardContent className="pt-4 text-center space-y-1">
                <div className="text-3xl">
                  {isUnlocked ? ach.icon : <Lock className="h-6 w-6 mx-auto text-muted-foreground" />}
                </div>
                <p className="text-xs font-semibold">{isUnlocked ? ach.name : '???'}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
