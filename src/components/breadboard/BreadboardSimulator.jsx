import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Trash2, Ruler } from 'lucide-react'
import useBreadboard from '@/hooks/useBreadboard'
import BreadboardGrid from './BreadboardGrid'
import ComponentCatalog from './ComponentCatalog'
import CircuitStatus from './CircuitStatus'
import VirtualMultimeter from './VirtualMultimeter'

export default function BreadboardSimulator({ exercise, color, onValidated }) {
  const board = useBreadboard()
  const [selectedForRemoval, setSelectedForRemoval] = useState(null)

  // Whether we're in placement mode (catalog item selected or probe being placed)
  const isPlacementMode = !!(board.pendingComponent || board.activeProbe)

  const handleComponentTap = (compId) => {
    setSelectedForRemoval((prev) => prev === compId ? null : compId)
  }

  const handleRemove = (compId) => {
    board.removeComponent(compId)
    setSelectedForRemoval(null)
  }

  const handleDeselect = () => {
    setSelectedForRemoval(null)
  }

  return (
    <div className="space-y-3">
      {/* Exercise header */}
      {exercise && (
        <div className="rounded-lg p-3 bg-secondary/30 border border-secondary">
          <h3 className="font-semibold text-sm" style={{ color }}>
            {exercise.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{exercise.description}</p>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={board.xrayMode ? 'default' : 'outline'}
          size="sm"
          onClick={board.toggleXray}
          className="gap-1.5 text-xs"
        >
          {board.xrayMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          Rayos X
        </Button>
        <Button
          variant={board.multimeterMode ? 'default' : 'outline'}
          size="sm"
          onClick={board.toggleMultimeter}
          className="gap-1.5 text-xs"
        >
          <Ruler className="h-3.5 w-3.5" />
          Multímetro
        </Button>
        <Button
          variant="outline" size="sm"
          onClick={board.clearBoard}
          className="gap-1.5 text-xs"
          disabled={board.components.length === 0}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Limpiar
        </Button>
        {board.components.length > 0 && (
          <span className="text-[10px] text-muted-foreground ml-auto">
            {board.components.length} componente{board.components.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Component catalog */}
      <ComponentCatalog
        selected={board.pendingComponent}
        onSelect={(item) => { board.selectCatalogItem(item); setSelectedForRemoval(null) }}
        onDeselect={board.deselectCatalog}
      />

      {/* Placement hint */}
      {board.pendingComponent && !board.pendingHoleA && (
        <p className="text-xs text-amber-400 text-center animate-pulse">
          Toca el primer agujero
        </p>
      )}
      {board.pendingHoleA && (
        <p className="text-xs text-amber-400 text-center animate-pulse">
          Toca el segundo agujero
        </p>
      )}

      {/* Breadboard grid — with drop shadow for floating effect */}
      <div className="rounded-xl overflow-hidden"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))' }}
      >
        <BreadboardGrid
          components={board.components}
          pendingHoleA={board.pendingHoleA}
          xrayMode={board.xrayMode}
          isPlacementMode={isPlacementMode}
          selectedComponentId={selectedForRemoval}
          onHoleTap={board.selectHole}
          onComponentTap={handleComponentTap}
          onRemoveComponent={handleRemove}
          onDeselect={handleDeselect}
          probeA={board.probeA}
          probeB={board.probeB}
          solution={board.solution}
        />
      </div>

      {/* Virtual Multimeter */}
      {board.multimeterMode && (
        <VirtualMultimeter
          meterMode={board.meterMode}
          onModeChange={board.setMeterMode}
          probeA={board.probeA}
          probeB={board.probeB}
          onSelectProbe={board.selectProbe}
          activeProbe={board.activeProbe}
          components={board.components}
          solution={board.solution}
        />
      )}

      {/* Circuit values */}
      <CircuitStatus solution={board.solution} components={board.components} />

      {/* Circuit faults */}
      {board.solution.faults.length > 0 && (
        <div className="space-y-1.5">
          {board.solution.faults.map((fault, i) => (
            <div
              key={i}
              className={`rounded-lg px-3 py-2 text-xs ${
                fault.severity === 'fatal'
                  ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}
            >
              {fault.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
