import { useState, useCallback, useRef } from 'react'
import { solveCircuit } from '@/lib/circuitSolver'

const WIRE_COLORS = ['#DC2626', '#2563EB', '#EAB308', '#16A34A', '#1C1917']

export default function useBreadboard() {
  const [components, setComponents] = useState([])
  const [pendingComponent, setPendingComponent] = useState(null)
  const [pendingHoleA, setPendingHoleA] = useState(null)
  const [xrayMode, setXrayMode] = useState(false)
  const [multimeterMode, setMultimeterMode] = useState(false)
  const [meterMode, setMeterMode] = useState('V')
  const [probeA, setProbeA] = useState(null)
  const [probeB, setProbeB] = useState(null)
  const [activeProbe, setActiveProbe] = useState(null) // 'A' | 'B' | null
  const [solution, setSolution] = useState({ nets: {}, components: {}, faults: [], valid: false })
  const idCounter = useRef(0)

  const selectCatalogItem = useCallback((item) => {
    setPendingComponent(item)
    setPendingHoleA(null)
  }, [])

  const deselectCatalog = useCallback(() => {
    setPendingComponent(null)
    setPendingHoleA(null)
  }, [])

  const selectHole = useCallback((holeId) => {
    // Multimeter probe placement takes priority
    if (activeProbe) {
      if (activeProbe === 'A') setProbeA(holeId)
      else setProbeB(holeId)
      setActiveProbe(null)
      return
    }

    if (!pendingComponent) return

    if (!pendingHoleA) {
      setPendingHoleA(holeId)
      return
    }

    // Don't place if same hole
    if (holeId === pendingHoleA) {
      setPendingHoleA(null)
      return
    }

    // Place the component
    idCounter.current += 1
    const newComp = {
      id: `comp-${idCounter.current}`,
      kind: pendingComponent.kind,
      holeA: pendingHoleA,
      holeB: holeId,
      value: pendingComponent.value,
      ledColor: pendingComponent.ledColor,
      wireColor: pendingComponent.kind === 'wire'
        ? WIRE_COLORS[(idCounter.current - 1) % WIRE_COLORS.length]
        : undefined,
    }

    setComponents((prev) => {
      const next = [...prev, newComp]
      setSolution(solveCircuit(next))
      return next
    })

    setPendingHoleA(null)
    setPendingComponent(null)
  }, [pendingComponent, pendingHoleA, activeProbe])

  const removeComponent = useCallback((id) => {
    setComponents((prev) => {
      const next = prev.filter((c) => c.id !== id)
      setSolution(solveCircuit(next))
      return next
    })
  }, [])

  const toggleXray = useCallback(() => {
    setXrayMode((prev) => !prev)
  }, [])

  const toggleMultimeter = useCallback(() => {
    setMultimeterMode((prev) => {
      if (prev) {
        // Turning off — clear probes
        setProbeA(null)
        setProbeB(null)
        setActiveProbe(null)
      }
      return !prev
    })
  }, [])

  const selectProbe = useCallback((probe) => {
    setActiveProbe((prev) => prev === probe ? null : probe)
    // Deselect catalog when placing probes
    setPendingComponent(null)
    setPendingHoleA(null)
  }, [])

  const clearBoard = useCallback(() => {
    setComponents([])
    setPendingComponent(null)
    setPendingHoleA(null)
    setProbeA(null)
    setProbeB(null)
    setActiveProbe(null)
    setSolution({ nets: {}, components: {}, faults: [], valid: false })
  }, [])

  // Load a saved board state
  const loadBoard = useCallback((savedComponents) => {
    setComponents(savedComponents || [])
    setSolution(solveCircuit(savedComponents || []))
    // Update id counter to avoid collisions
    const maxId = (savedComponents || []).reduce((max, c) => {
      const num = parseInt(c.id.replace('comp-', ''), 10) || 0
      return Math.max(max, num)
    }, 0)
    idCounter.current = maxId
  }, [])

  return {
    components,
    pendingComponent,
    pendingHoleA,
    xrayMode,
    multimeterMode,
    meterMode,
    probeA,
    probeB,
    activeProbe,
    solution,
    selectCatalogItem,
    deselectCatalog,
    selectHole,
    removeComponent,
    toggleXray,
    toggleMultimeter,
    setMeterMode,
    selectProbe,
    clearBoard,
    loadBoard,
  }
}
