import { useState, useCallback } from 'react'

const STORAGE_KEY = 'eletrinoa-progress'

const DEFAULT_STATE = {
  moduleProgress: {},
  achievements: [],
  examScores: [],
}

// Module phase definitions
const MODULE_PHASES = {
  1: ['entiende', 'demuestra'],
  2: ['entiende', 'demuestra'],
  3: ['entiende', 'demuestra', 'construye', 'comprueba'],
  4: ['entiende', 'demuestra', 'construye'], // No comprueba phase
  5: ['entiende', 'demuestra', 'construye', 'comprueba'],
  6: ['entiende', 'demuestra', 'construye', 'comprueba'],
  7: ['entiende', 'demuestra', 'construye', 'comprueba'],
  8: ['entiende', 'demuestra', 'construye', 'comprueba', 'laboratorio'],
  final: ['entiende', 'demuestra', 'construye', 'comprueba'],
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export default function useProgress() {
  const [state, setState] = useState(loadState)

  const persist = useCallback((updater) => {
    setState((prev) => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  const getModuleProgress = useCallback((moduleId) => {
    const id = String(moduleId)
    return state.moduleProgress[id] || { phases: [], completed: false }
  }, [state])

  const completePhase = useCallback((moduleId, phase) => {
    persist((prev) => {
      const id = String(moduleId)
      const current = prev.moduleProgress[id] || { phases: [], completed: false }
      if (current.phases.includes(phase)) return prev

      const phases = [...current.phases, phase]
      const allPhases = MODULE_PHASES[moduleId] || MODULE_PHASES[id]
      const completed = allPhases ? allPhases.every((p) => phases.includes(p)) : false

      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [id]: { phases, completed },
        },
      }
    })
  }, [persist])

  const isModuleComplete = useCallback((moduleId) => {
    return getModuleProgress(moduleId).completed
  }, [getModuleProgress])

  const isModuleUnlocked = useCallback((moduleId) => {
    const id = Number(moduleId)
    if (id === 1) return true
    if (moduleId === 'final') return isModuleComplete(8)
    return isModuleComplete(id - 1)
  }, [isModuleComplete])

  const isPhaseUnlocked = useCallback((moduleId, phase) => {
    if (!isModuleUnlocked(moduleId)) return false
    const phases = MODULE_PHASES[moduleId] || []
    const idx = phases.indexOf(phase)
    if (idx <= 0) return true
    const prevPhase = phases[idx - 1]
    return getModuleProgress(moduleId).phases.includes(prevPhase)
  }, [isModuleUnlocked, getModuleProgress])

  const unlockAchievement = useCallback((achievementId) => {
    persist((prev) => {
      if (prev.achievements.includes(achievementId)) return prev
      return { ...prev, achievements: [...prev.achievements, achievementId] }
    })
  }, [persist])

  const getAchievements = useCallback(() => {
    return state.achievements
  }, [state])

  const addExamScore = useCallback((score, level) => {
    persist((prev) => ({
      ...prev,
      examScores: [
        ...prev.examScores,
        { score, level, date: new Date().toISOString().slice(0, 10) },
      ],
    }))
  }, [persist])

  const getExamScores = useCallback(() => {
    return state.examScores
  }, [state])

  const getCompletedModuleCount = useCallback(() => {
    return Object.values(state.moduleProgress).filter((m) => m.completed).length
  }, [state])

  const completeModule = useCallback((moduleId) => {
    const id = String(moduleId)
    const allPhases = MODULE_PHASES[moduleId] || MODULE_PHASES[id] || []
    persist((prev) => ({
      ...prev,
      moduleProgress: {
        ...prev.moduleProgress,
        [id]: { phases: [...allPhases], completed: true },
      },
    }))
  }, [persist])

  const completeAllModules = useCallback(() => {
    persist((prev) => {
      const moduleProgress = {}
      for (const [id, phases] of Object.entries(MODULE_PHASES)) {
        moduleProgress[String(id)] = { phases: [...phases], completed: true }
      }
      return { ...prev, moduleProgress }
    })
  }, [persist])

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_STATE }
    saveState(fresh)
    setState(fresh)
  }, [])

  const getRawState = useCallback(() => state, [state])

  return {
    getModuleProgress,
    completePhase,
    completeModule,
    completeAllModules,
    isModuleComplete,
    isModuleUnlocked,
    isPhaseUnlocked,
    unlockAchievement,
    getAchievements,
    addExamScore,
    getExamScores,
    getCompletedModuleCount,
    resetProgress,
    getRawState,
  }
}
