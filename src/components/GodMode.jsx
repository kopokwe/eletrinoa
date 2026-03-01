import { useState, useEffect, useCallback, useRef } from 'react'
import { MODULES } from '@/data/modules'
import { ACHIEVEMENTS } from '@/data/achievements'
import {
  X, Zap, RotateCcw, Trophy, Eye, ChevronDown, ChevronUp,
  Unlock, CheckCircle, Navigation, FlaskConical, Database
} from 'lucide-react'

export default function GodMode({ progress, onNavigate, currentView }) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState('modules') // modules | achievements | navigate | state
  const [toast, setToast] = useState(null)

  // Keyboard shortcut: Cmd+Ctrl+Option+Shift+G
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'g' && e.metaKey && e.ctrlKey && e.altKey && e.shiftKey) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Mobile: expose toggle on window for console access + secret tap zone
  useEffect(() => {
    window.__godmode = () => setOpen((prev) => !prev)
    return () => delete window.__godmode
  }, [])

  const flash = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 1500)
  }, [])

  if (!open) {
    return (
      <div
        className="fixed bottom-2 right-2 w-3 h-3 rounded-full bg-gray-600/40 z-50"
        onDoubleClick={() => setOpen(true)}
      />
    )
  }

  const raw = progress.getRawState()

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className="relative bg-gray-900 border border-red-500/50 rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-2xl shadow-red-500/10">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-red-500/30 bg-red-500/5">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-red-500" />
            <span className="text-sm font-bold text-red-400">GOD MODE</span>
            <span className="text-[10px] text-muted-foreground font-mono">
              {currentView}
            </span>
          </div>
          <button onClick={() => setOpen(false)} className="p-1 hover:bg-red-500/20 rounded">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-border text-xs">
          {[
            { id: 'modules', icon: Unlock, label: 'Modules' },
            { id: 'achievements', icon: Trophy, label: 'Achievements' },
            { id: 'navigate', icon: Navigation, label: 'Navigate' },
            { id: 'state', icon: Database, label: 'State' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`flex-1 py-2 flex items-center justify-center gap-1 transition-colors ${
                section === tab.id ? 'text-red-400 bg-red-500/10 border-b-2 border-red-500' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-3 w-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Quick Actions — always visible */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => { progress.completeAllModules(); flash('All modules completed') }}
              className="flex-1 bg-green-600/20 text-green-400 text-xs py-2 px-3 rounded-lg hover:bg-green-600/30 transition-colors"
            >
              Unlock All
            </button>
            <button
              onClick={() => {
                ACHIEVEMENTS.forEach((a) => progress.unlockAchievement(a.id))
                flash('All achievements granted')
              }}
              className="flex-1 bg-amber-600/20 text-amber-400 text-xs py-2 px-3 rounded-lg hover:bg-amber-600/30 transition-colors"
            >
              All Badges
            </button>
            <button
              onClick={() => { progress.resetProgress(); flash('Progress reset') }}
              className="flex-1 bg-red-600/20 text-red-400 text-xs py-2 px-3 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              Reset All
            </button>
          </div>

          {section === 'modules' && (
            <div className="space-y-1">
              {MODULES.map((mod) => {
                const p = progress.getModuleProgress(mod.id)
                const isComplete = p.completed
                return (
                  <div key={mod.id} className="flex items-center gap-2 bg-card rounded-lg p-2">
                    <span className="text-lg w-8 text-center">{mod.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {typeof mod.id === 'number' ? `M${mod.id}` : 'Final'}: {mod.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {p.phases.length}/{mod.phases.length} phases
                        {isComplete && ' ✅'}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => { progress.completeModule(mod.id); flash(`M${mod.id} completed`) }}
                        className="text-[10px] bg-green-600/20 text-green-400 px-2 py-1 rounded hover:bg-green-600/30"
                        title="Complete all phases"
                      >
                        {isComplete ? '✓' : 'Complete'}
                      </button>
                      <button
                        onClick={() => { onNavigate(`module-${mod.id}`); setOpen(false) }}
                        className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-600/30"
                        title="Jump to module"
                      >
                        Go
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {section === 'achievements' && (
            <div className="space-y-1">
              {ACHIEVEMENTS.map((ach) => {
                const unlocked = progress.getAchievements().includes(ach.id)
                return (
                  <div key={ach.id} className="flex items-center gap-2 bg-card rounded-lg p-2">
                    <span className="text-lg w-8 text-center">{unlocked ? ach.icon : '🔒'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{ach.name}</p>
                      <p className="text-[10px] text-muted-foreground">{ach.trigger}</p>
                    </div>
                    <button
                      onClick={() => {
                        progress.unlockAchievement(ach.id)
                        flash(`${ach.name} unlocked`)
                      }}
                      className={`text-[10px] px-2 py-1 rounded ${
                        unlocked
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-amber-600/20 text-amber-400 hover:bg-amber-600/30'
                      }`}
                    >
                      {unlocked ? '✓' : 'Grant'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {section === 'navigate' && (
            <div className="space-y-1">
              {[
                { view: 'home', label: 'Home', icon: '🏠' },
                { view: 'formulas', label: 'FormulaSheet', icon: '📋' },
                { view: 'inventory', label: 'Inventory', icon: '🧰' },
                { view: 'achievements', label: 'Achievements', icon: '🏆' },
                { view: 'exam', label: 'ExamSimulator', icon: '📝' },
                ...MODULES.map((m) => ({
                  view: `module-${m.id}`,
                  label: `Module ${m.id}: ${m.title}`,
                  icon: m.emoji,
                })),
              ].map((item) => (
                <button
                  key={item.view}
                  onClick={() => { onNavigate(item.view); setOpen(false) }}
                  className={`w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-secondary transition-colors ${
                    currentView === item.view ? 'bg-blue-600/20 text-blue-400' : 'bg-card'
                  }`}
                >
                  <span className="text-lg w-8 text-center">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                  {currentView === item.view && (
                    <span className="text-[10px] text-blue-400 ml-auto">current</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {section === 'state' && (
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">localStorage raw state</p>
                <pre className="text-[10px] bg-black rounded p-2 overflow-x-auto text-green-400 font-mono leading-relaxed max-h-60 overflow-y-auto">
                  {JSON.stringify(raw, null, 2)}
                </pre>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Quick inject</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      progress.addExamScore(85, 1)
                      progress.addExamScore(90, 2)
                      progress.addExamScore(80, 3)
                      flash('3 exam scores injected')
                    }}
                    className="text-[10px] bg-purple-600/20 text-purple-400 px-3 py-1.5 rounded hover:bg-purple-600/30"
                  >
                    +3 exam scores (85/90/80)
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('eletrinoa-progress')
                      progress.resetProgress()
                      flash('localStorage cleared')
                    }}
                    className="text-[10px] bg-red-600/20 text-red-400 px-3 py-1.5 rounded hover:bg-red-600/30"
                  >
                    Nuke localStorage
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Stats</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-card rounded p-2">
                    <p className="text-lg font-bold">{progress.getCompletedModuleCount()}</p>
                    <p className="text-[10px] text-muted-foreground">Modules</p>
                  </div>
                  <div className="bg-card rounded p-2">
                    <p className="text-lg font-bold">{progress.getAchievements().length}</p>
                    <p className="text-[10px] text-muted-foreground">Badges</p>
                  </div>
                  <div className="bg-card rounded p-2">
                    <p className="text-lg font-bold">{progress.getExamScores().length}</p>
                    <p className="text-[10px] text-muted-foreground">Exams</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-4 py-2 rounded-full shadow-lg animate-pulse">
            {toast}
          </div>
        )}

        {/* Footer */}
        <div className="p-2 border-t border-border bg-card/50">
          <p className="text-[9px] text-muted-foreground text-center">
            Cmd+Ctrl+Opt+Shift+G to toggle | <code>window.__godmode()</code> in console | tap red dot
          </p>
        </div>
      </div>
    </div>
  )
}
