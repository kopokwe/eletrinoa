import { useMemo } from 'react'
import {
  COLS, HOLE_SPACING, CHANNEL_GAP, MARGIN_LEFT, MARGIN_TOP,
  BOARD_WIDTH, HOLE_RADIUS, BOARD_PADDING,
  POWER_COL, GROUND_COL,
  holeId, colX, rowY, holeCoords, parseHoleId,
} from '@/lib/breadboard'
import BreadboardHole from './BreadboardHole'
import ComponentRenderer from './ComponentRenderer'

const MIN_ROWS = 10
const ROW_PADDING = 3

// All SVG gradient/pattern/filter definitions — instantiated once, referenced by ID
function SvgDefs() {
  return (
    <defs>
      {/* FR4 board surface */}
      <linearGradient id="boardSurface" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EDE3D1" />
        <stop offset="100%" stopColor="#E0D4BE" />
      </linearGradient>

      {/* Board grain texture */}
      <pattern id="boardNoise" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill="transparent" />
        <rect x="0" y="0" width="1" height="1" fill="#DDD0BA" opacity="0.3" />
        <rect x="2" y="2" width="1" height="1" fill="#F0E6D4" opacity="0.2" />
        <rect x="1" y="3" width="1" height="1" fill="#DDD0BA" opacity="0.2" />
        <rect x="3" y="1" width="1" height="1" fill="#D8CCB6" opacity="0.25" />
      </pattern>

      {/* Metallic hole — concave radial gradient */}
      <radialGradient id="holeDefault" cx="0.4" cy="0.35" r="0.6">
        <stop offset="0%" stopColor="#2A2A2A" />
        <stop offset="60%" stopColor="#606060" />
        <stop offset="85%" stopColor="#A0A0A0" />
        <stop offset="100%" stopColor="#C0C0C0" />
      </radialGradient>

      <radialGradient id="holePending" cx="0.4" cy="0.35" r="0.6">
        <stop offset="0%" stopColor="#8B6914" />
        <stop offset="50%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="#FFD700" />
      </radialGradient>

      <radialGradient id="holeOccupied" cx="0.4" cy="0.35" r="0.6">
        <stop offset="0%" stopColor="#3A2A1A" />
        <stop offset="60%" stopColor="#7A5C3A" />
        <stop offset="100%" stopColor="#B87333" />
      </radialGradient>

      {/* Resistor ceramic body */}
      <linearGradient id="resistorBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0BB90" />
        <stop offset="25%" stopColor="#D4A574" />
        <stop offset="75%" stopColor="#C09060" />
        <stop offset="100%" stopColor="#A87A50" />
      </linearGradient>

      <linearGradient id="resistorBodySelected" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#FFC107" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>

      {/* Metal lead gradient */}
      <linearGradient id="metalLead" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#999" />
        <stop offset="50%" stopColor="#777" />
        <stop offset="100%" stopColor="#555" />
      </linearGradient>

      {/* Channel groove */}
      <linearGradient id="channelGroove" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#A89880" />
        <stop offset="20%" stopColor="#C4B8A0" />
        <stop offset="80%" stopColor="#C4B8A0" />
        <stop offset="100%" stopColor="#A89880" />
      </linearGradient>

      {/* Component drop shadow */}
      <filter id="componentShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.25" />
      </filter>

      {/* Hole inner shadow */}
      <filter id="holeShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0.3" stdDeviation="0.4" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
  )
}

// Board background layers: FR4 surface + grain + bevel + bus rails + channel
function BoardSurface({ boardHeight, visibleRows }) {
  const firstRowY = rowY(1) - HOLE_SPACING / 2
  const lastRowY = rowY(visibleRows) + HOLE_SPACING / 2
  const railHeight = lastRowY - firstRowY
  const channelX = (colX('F') + colX('G')) / 2

  return (
    <g>
      {/* Base cream surface */}
      <rect x={0} y={0} width={BOARD_WIDTH} height={boardHeight}
        fill="url(#boardSurface)" rx={8} />

      {/* Grain texture overlay */}
      <rect x={0} y={0} width={BOARD_WIDTH} height={boardHeight}
        fill="url(#boardNoise)" rx={8} />

      {/* 3D bevel — light top-left edge */}
      <rect x={1} y={1} width={BOARD_WIDTH - 2} height={boardHeight - 2}
        fill="none" rx={7}
        stroke="#F0E6D4" strokeWidth={1.5} />
      {/* 3D bevel — dark bottom-right edge (overlaps to create illusion) */}
      <line x1={BOARD_WIDTH - 1} y1={12} x2={BOARD_WIDTH - 1} y2={boardHeight - 8}
        stroke="#B8A890" strokeWidth={1.5} />
      <line x1={12} y1={boardHeight - 1} x2={BOARD_WIDTH - 8} y2={boardHeight - 1}
        stroke="#B8A890" strokeWidth={1.5} />

      {/* Power bus rail stripe (column A) */}
      <rect x={colX(POWER_COL) - HOLE_SPACING / 2} y={firstRowY}
        width={HOLE_SPACING} height={railHeight}
        fill="#DC2626" opacity={0.08} rx={2} />
      {/* Ground bus rail stripe (column L) */}
      <rect x={colX(GROUND_COL) - HOLE_SPACING / 2} y={firstRowY}
        width={HOLE_SPACING} height={railHeight}
        fill="#2563EB" opacity={0.08} rx={2} />

      {/* Channel groove */}
      <rect
        x={channelX - CHANNEL_GAP / 2}
        y={firstRowY - 2}
        width={CHANNEL_GAP}
        height={railHeight + 4}
        fill="url(#channelGroove)" rx={2}
      />
      {/* Center slot line */}
      <line
        x1={channelX} y1={firstRowY}
        x2={channelX} y2={lastRowY}
        stroke="#8A7E6E" strokeWidth={0.8} opacity={0.5}
      />
    </g>
  )
}

// X-ray overlay: show internal connections as colored bands
function XrayOverlay({ visibleRows }) {
  const firstRowY = rowY(1) - HOLE_SPACING / 2
  const lastRowY = rowY(visibleRows) + HOLE_SPACING / 2
  const fullHeight = lastRowY - firstRowY
  const powerX = colX(POWER_COL)
  const groundX = colX(GROUND_COL)

  return (
    <g className="pointer-events-none" opacity={0.3}>
      <rect
        x={powerX - HOLE_SPACING / 2} y={firstRowY}
        width={HOLE_SPACING} height={fullHeight}
        fill="#EF4444" rx={3}
      />
      <rect
        x={groundX - HOLE_SPACING / 2} y={firstRowY}
        width={HOLE_SPACING} height={fullHeight}
        fill="#3B82F6" rx={3}
      />
      {Array.from({ length: visibleRows }, (_, i) => {
        const row = i + 1
        const y = rowY(row)
        const xStartR = colX('B') - HOLE_SPACING / 2 + 1
        const xEndR = colX('F') + HOLE_SPACING / 2 - 1
        const xStartL = colX('G') - HOLE_SPACING / 2 + 1
        const xEndL = colX('K') + HOLE_SPACING / 2 - 1
        return (
          <g key={row}>
            <rect x={xStartR} y={y - 3} width={xEndR - xStartR} height={6} fill="#22D3EE" rx={2} />
            <rect x={xStartL} y={y - 3} width={xEndL - xStartL} height={6} fill="#A78BFA" rx={2} />
          </g>
        )
      })}
    </g>
  )
}

function ColumnLabels() {
  return (
    <g className="pointer-events-none select-none">
      {COLS.map((col) => {
        const x = colX(col)
        const isPower = col === POWER_COL
        const isGround = col === GROUND_COL
        const label = isPower ? '+' : isGround ? '−' : col

        let fill = '#8A7E6E'
        if (isPower) fill = '#DC2626'
        if (isGround) fill = '#2563EB'

        return (
          <g key={col}>
            {/* Debossed shadow (lighter, offset up-left) */}
            <text
              x={x} y={MARGIN_TOP - 12}
              dx={-0.3} dy={-0.3}
              textAnchor="middle"
              fill="#F0E6D4"
              fontSize={8}
              fontWeight={isPower || isGround ? 'bold' : 'normal'}
              fontFamily="monospace"
            >
              {label}
            </text>
            {/* Main text */}
            <text
              x={x} y={MARGIN_TOP - 12}
              textAnchor="middle"
              fill={fill}
              fontSize={8}
              fontWeight={isPower || isGround ? 'bold' : 'normal'}
              fontFamily="monospace"
            >
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function RowLabels({ visibleRows }) {
  return (
    <g className="pointer-events-none select-none">
      {Array.from({ length: visibleRows }, (_, i) => {
        const row = i + 1
        if (row % 5 !== 0 && row !== 1) return null
        return (
          <g key={row}>
            <text
              x={BOARD_WIDTH - 4} y={rowY(row) + 3}
              dx={-0.3} dy={-0.3}
              textAnchor="end" fill="#F0E6D4" fontSize={6} fontFamily="monospace"
            >
              {row}
            </text>
            <text
              x={BOARD_WIDTH - 4} y={rowY(row) + 3}
              textAnchor="end" fill="#8A7E6E" fontSize={6} fontFamily="monospace"
            >
              {row}
            </text>
          </g>
        )
      })}
    </g>
  )
}

// Probe dots for the multimeter
function ProbeDots({ probeA, probeB }) {
  const dots = []
  if (probeA) {
    const { x, y } = holeCoords(probeA)
    dots.push(
      <circle key="pA" cx={x} cy={y} r={5} fill="#EF4444" opacity={0.7} className="pointer-events-none" />,
      <circle key="pA-ring" cx={x} cy={y} r={7} fill="none" stroke="#EF4444" strokeWidth={1} opacity={0.5} className="pointer-events-none" />,
    )
  }
  if (probeB) {
    const { x, y } = holeCoords(probeB)
    dots.push(
      <circle key="pB" cx={x} cy={y} r={5} fill="#3B82F6" opacity={0.7} className="pointer-events-none" />,
      <circle key="pB-ring" cx={x} cy={y} r={7} fill="none" stroke="#3B82F6" strokeWidth={1} opacity={0.5} className="pointer-events-none" />,
    )
  }
  return <g>{dots}</g>
}

// Delete badge — red × circle on selected component
function DeleteBadge({ components, selectedId, onRemove }) {
  if (!selectedId) return null
  const comp = components.find((c) => c.id === selectedId)
  if (!comp) return null

  const a = holeCoords(comp.holeA)
  const b = holeCoords(comp.holeB)
  const mx = (a.x + b.x) / 2
  const my = Math.min(a.y, b.y) - 11

  return (
    <g className="cursor-pointer delete-badge"
      onClick={(e) => { e.stopPropagation(); onRemove(selectedId) }}
    >
      {/* Larger invisible touch target */}
      <circle cx={mx} cy={my} r={12} fill="transparent" />
      {/* Red circle */}
      <circle cx={mx} cy={my} r={7} fill="#DC2626"
        stroke="#FFFFFF" strokeWidth={1.2}
        style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
      {/* White × */}
      <line x1={mx - 2.5} y1={my - 2.5} x2={mx + 2.5} y2={my + 2.5}
        stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" />
      <line x1={mx + 2.5} y1={my - 2.5} x2={mx - 2.5} y2={my + 2.5}
        stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" />
    </g>
  )
}

export default function BreadboardGrid({
  components,
  pendingHoleA,
  xrayMode,
  isPlacementMode,
  selectedComponentId,
  onHoleTap,
  onComponentTap,
  onRemoveComponent,
  onDeselect,
  probeA,
  probeB,
  solution,
}) {
  // Dynamic row count: show only as many rows as needed
  const visibleRows = useMemo(() => {
    let maxRow = MIN_ROWS
    for (const comp of components) {
      const rowA = parseHoleId(comp.holeA).row
      const rowB = parseHoleId(comp.holeB).row
      maxRow = Math.max(maxRow, rowA, rowB)
    }
    if (pendingHoleA) {
      maxRow = Math.max(maxRow, parseHoleId(pendingHoleA).row)
    }
    return Math.min(maxRow + ROW_PADDING, 46)
  }, [components, pendingHoleA])

  const boardHeight = rowY(visibleRows) + BOARD_PADDING + 4

  // Track which holes have components
  const occupiedHoles = useMemo(() => {
    const set = new Set()
    for (const comp of components) {
      set.add(comp.holeA)
      set.add(comp.holeB)
    }
    return set
  }, [components])

  return (
    <svg
      viewBox={`0 0 ${BOARD_WIDTH} ${boardHeight}`}
      className="w-full h-auto touch-manipulation"
      style={{ maxWidth: 400 }}
    >
      <SvgDefs />

      {/* Board surface (cream FR4 with bevel, bus rails, channel) */}
      <BoardSurface boardHeight={boardHeight} visibleRows={visibleRows} />

      {/* Tap on empty board area to deselect */}
      <rect x={0} y={0} width={BOARD_WIDTH} height={boardHeight}
        fill="transparent" rx={8}
        onClick={onDeselect}
      />

      {xrayMode && <XrayOverlay visibleRows={visibleRows} />}

      <ColumnLabels />
      <RowLabels visibleRows={visibleRows} />

      {/* Holes layer */}
      {COLS.map((col) =>
        Array.from({ length: visibleRows }, (_, i) => {
          const row = i + 1
          const id = holeId(col, row)
          const { x, y } = holeCoords(id)
          return (
            <BreadboardHole
              key={id}
              x={x} y={y} id={id}
              isPending={id === pendingHoleA}
              isOccupied={occupiedHoles.has(id)}
              onTap={onHoleTap}
            />
          )
        }),
      )}

      {/* Short-circuit flash overlay */}
      {solution?.faults?.some((f) => f.kind === 'short_circuit') && (
        <rect
          x={0} y={0}
          width={BOARD_WIDTH} height={boardHeight}
          fill="#EF4444" rx={8}
          className="board-flash pointer-events-none"
        />
      )}

      {/* Components layer — ON TOP of holes
          pointer-events off during placement so holes stay tappable */}
      <g style={{ pointerEvents: isPlacementMode ? 'none' : 'auto' }}>
        <ComponentRenderer
          components={components}
          selectedId={selectedComponentId}
          onTap={onComponentTap}
          solution={solution}
        />
      </g>

      {/* Delete badge (above components, below probes) */}
      <DeleteBadge
        components={components}
        selectedId={selectedComponentId}
        onRemove={onRemoveComponent}
      />

      {/* Probe dots (topmost layer) */}
      <ProbeDots probeA={probeA} probeB={probeB} />
    </svg>
  )
}
