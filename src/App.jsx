import { useState, useCallback, lazy, Suspense } from 'react'
import useProgress from '@/hooks/useProgress'
import { MODULES } from '@/data/modules'
import { ACHIEVEMENTS } from '@/data/achievements'
import AchievementPopup from '@/components/AchievementPopup'
import GodMode from '@/components/GodMode'
import Home from '@/sections/Home'

// Modules
import Module1 from '@/modules/Module1'
import Module2 from '@/modules/Module2'
import Module3 from '@/modules/Module3'
import Module4 from '@/modules/Module4'
import Module5 from '@/modules/Module5'
import Module6 from '@/modules/Module6'
import Module7 from '@/modules/Module7'
import Module8 from '@/modules/Module8'

// Sections
import FormulaSheet from '@/sections/FormulaSheet'
import Inventory from '@/sections/Inventory'
import Achievements from '@/sections/Achievements'
import ExamSimulator from '@/sections/ExamSimulator'

const MODULE_COMPONENTS = {
  1: Module1, 2: Module2, 3: Module3, 4: Module4,
  5: Module5, 6: Module6, 7: Module7, 8: Module8,
}

export default function App() {
  const [currentView, setCurrentView] = useState('home')
  const [pendingAchievement, setPendingAchievement] = useState(null)
  const progress = useProgress()

  const navigate = useCallback((view) => setCurrentView(view), [])
  const goHome = useCallback(() => setCurrentView('home'), [])

  const handleModuleComplete = useCallback((moduleId) => {
    const mod = MODULES.find((m) => String(m.id) === String(moduleId))
    if (mod?.achievement) {
      const ach = ACHIEVEMENTS.find((a) => a.id === mod.achievement)
      if (ach && !progress.getAchievements().includes(ach.id)) {
        progress.unlockAchievement(ach.id)
        setPendingAchievement(ach)
      }
    }
    // Check "ingeniera" — all modules complete
    const allComplete = MODULES.every((m) => progress.isModuleComplete(m.id) || String(m.id) === String(moduleId))
    if (allComplete && !progress.getAchievements().includes('ingeniera')) {
      progress.unlockAchievement('ingeniera')
      // Show after current achievement
      setTimeout(() => {
        setPendingAchievement(ACHIEVEMENTS.find((a) => a.id === 'ingeniera'))
      }, 2000)
    }
  }, [progress])

  // Render current view
  const renderView = () => {
    if (currentView === 'home') {
      return (
        <Home
          onNavigate={navigate}
          getModuleProgress={progress.getModuleProgress}
          isModuleUnlocked={progress.isModuleUnlocked}
          isModuleComplete={progress.isModuleComplete}
          completedCount={progress.getCompletedModuleCount()}
        />
      )
    }

    if (currentView === 'formulas') return <FormulaSheet onBack={goHome} />
    if (currentView === 'inventory') return <Inventory onBack={goHome} />
    if (currentView === 'achievements') return <Achievements onBack={goHome} achievements={progress.getAchievements()} />
    if (currentView === 'exam') {
      return (
        <ExamSimulator
          onBack={goHome}
          addExamScore={progress.addExamScore}
          getExamScores={progress.getExamScores}
          unlockAchievement={progress.unlockAchievement}
        />
      )
    }

    // Module views
    const match = currentView.match(/^module-(.+)$/)
    if (match) {
      const moduleId = match[1]
      const ModuleComponent = MODULE_COMPONENTS[moduleId]
      if (ModuleComponent) {
        return (
          <ModuleComponent
            onBack={goHome}
            onComplete={() => handleModuleComplete(moduleId)}
            progress={progress}
          />
        )
      }
    }

    return <Home onNavigate={navigate} getModuleProgress={progress.getModuleProgress} isModuleUnlocked={progress.isModuleUnlocked} isModuleComplete={progress.isModuleComplete} completedCount={progress.getCompletedModuleCount()} />
  }

  return (
    <>
      {renderView()}
      {pendingAchievement && (
        <AchievementPopup
          achievement={pendingAchievement}
          onClose={() => setPendingAchievement(null)}
        />
      )}
      <GodMode progress={progress} onNavigate={navigate} currentView={currentView} />
    </>
  )
}
