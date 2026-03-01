import { PHASE_LABELS } from '@/data/modules'
import { Lock } from 'lucide-react'

export default function PhaseNavigation({ phases, activePhase, completedPhases, unlockedPhases, onSelect, color }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
      {phases.map((phase) => {
        const meta = PHASE_LABELS[phase]
        const isActive = activePhase === phase
        const isCompleted = completedPhases.includes(phase)
        const isUnlocked = unlockedPhases.includes(phase)

        return (
          <button
            key={phase}
            onClick={() => isUnlocked && onSelect(phase)}
            disabled={!isUnlocked}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all shrink-0 ${
              isActive
                ? 'text-white font-semibold'
                : isCompleted
                ? 'bg-secondary/50 text-foreground'
                : isUnlocked
                ? 'bg-secondary/30 text-muted-foreground'
                : 'opacity-40 cursor-not-allowed'
            }`}
            style={isActive ? { backgroundColor: color } : undefined}
          >
            {!isUnlocked && <Lock className="h-3 w-3" />}
            <span>{meta?.emoji}</span>
            <span>{meta?.label}</span>
            {isCompleted && !isActive && <span className="text-green-500">✓</span>}
          </button>
        )
      })}
    </div>
  )
}
