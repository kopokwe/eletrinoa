import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lock, CheckCircle, ChevronRight } from 'lucide-react'

export default function ModuleCard({ module, progress, locked, onClick }) {
  const completedPhases = progress?.phases?.length || 0
  const totalPhases = module.phases.length
  const isComplete = progress?.completed

  return (
    <Card
      className={`cursor-pointer transition-all active:scale-[0.98] ${
        locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-foreground/20'
      }`}
      onClick={locked ? undefined : onClick}
    >
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ backgroundColor: module.color + '22' }}
          >
            {locked ? <Lock className="h-5 w-5 text-muted-foreground" /> : module.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate">{module.title}</h3>
              {isComplete && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
            </div>
            {!locked && (
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(completedPhases / totalPhases) * 100}%`,
                      backgroundColor: module.color,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {completedPhases}/{totalPhases}
                </span>
              </div>
            )}
            {locked && (
              <p className="text-xs text-muted-foreground mt-1">Completa el módulo anterior</p>
            )}
          </div>
          {!locked && <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />}
        </div>
      </CardContent>
    </Card>
  )
}
