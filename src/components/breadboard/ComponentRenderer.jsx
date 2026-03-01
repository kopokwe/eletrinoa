import { holeCoords, wirePath } from '@/lib/breadboard'
import { resistorBands, LED_COLORS } from '@/data/componentCatalog'

function WireSVG({ comp, selected, onTap, compSolution }) {
  const a = holeCoords(comp.holeA)
  const b = holeCoords(comp.holeB)
  const path = wirePath(a.x, a.y, b.x, b.y)
  const baseColor = comp.wireColor || '#DC2626'
  const color = selected ? '#EF4444' : baseColor

  return (
    <g className="cursor-pointer" onClick={() => onTap?.(comp.id)}
      filter={selected ? undefined : 'url(#componentShadow)'}
    >
      {/* Wider invisible hit area */}
      <path d={path} fill="none" stroke="transparent" strokeWidth={14} />
      {/* Wire shadow on board */}
      <path d={path} fill="none" stroke="#00000040" strokeWidth={4} strokeLinecap="round" />
      {/* Wire insulation (main body) */}
      <path d={path} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
      {/* Top highlight (round-wire 3D illusion) */}
      <path d={path} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.15} />
      {/* Core color layer */}
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      {/* Current flow animation overlay */}
      {compSolution && compSolution.currentThrough > 0.001 && (
        <path
          d={path} fill="none"
          stroke="#22d3ee" strokeWidth={1.5} strokeLinecap="round"
          className="wire-current" opacity={0.6}
        />
      )}
      {/* Exposed metal tips at endpoints */}
      <circle cx={a.x} cy={a.y} r={2.2} fill="#C0C0C0" stroke="#888" strokeWidth={0.5} />
      <circle cx={b.x} cy={b.y} r={2.2} fill="#C0C0C0" stroke="#888" strokeWidth={0.5} />
    </g>
  )
}

function ResistorSVG({ comp, selected, onTap, compSolution }) {
  const a = holeCoords(comp.holeA)
  const b = holeCoords(comp.holeB)
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const bodyLen = Math.min(len * 0.5, 22)
  const bodyH = 7

  const bands = resistorBands(comp.value || 0)
  const bandW = 2
  const bandSpacing = bodyLen / (bands.length + 1)

  // Heat shimmer for overloaded resistors (P > 0.25W)
  const isOverloaded = compSolution && compSolution.powerDissipated > 0.25

  return (
    <g
      transform={`translate(${mx},${my}) rotate(${angle})`}
      className={`cursor-pointer ${selected ? 'comp-shake' : ''}`}
      onClick={() => onTap?.(comp.id)}
      filter={selected ? undefined : 'url(#componentShadow)'}
    >
      {/* Wider invisible hit area */}
      <rect x={-len / 2} y={-10} width={len} height={20} fill="transparent" />
      {/* Heat shimmer glow */}
      {isOverloaded && (
        <rect
          x={-bodyLen / 2 - 2} y={-bodyH / 2 - 2}
          width={bodyLen + 4} height={bodyH + 4}
          fill="#f97316" rx={3} className="heat-shimmer"
        />
      )}
      {/* Metal leads */}
      <line x1={-len / 2} y1={0} x2={-bodyLen / 2} y2={0}
        stroke="url(#metalLead)" strokeWidth={1.5} />
      <line x1={bodyLen / 2} y1={0} x2={len / 2} y2={0}
        stroke="url(#metalLead)" strokeWidth={1.5} />
      {/* Body shadow (beneath, offset) */}
      <rect
        x={-bodyLen / 2 + 0.5} y={-bodyH / 2 + 1}
        width={bodyLen} height={bodyH}
        fill="#00000030" rx={bodyH / 2}
      />
      {/* Ceramic body with cylindrical gradient */}
      <rect
        x={-bodyLen / 2} y={-bodyH / 2}
        width={bodyLen} height={bodyH}
        fill={selected ? 'url(#resistorBodySelected)' : 'url(#resistorBody)'}
        rx={bodyH / 2}
        stroke={selected ? '#FFA000' : '#8B7355'} strokeWidth={0.5}
      />
      {/* Top gloss highlight */}
      <rect
        x={-bodyLen / 2 + 2} y={-bodyH / 2 + 0.5}
        width={bodyLen - 4} height={bodyH * 0.3}
        fill="#FFFFFF" opacity={0.12} rx={2}
      />
      {/* Color bands with glossy highlights */}
      {bands.map((bandColor, i) => (
        <g key={i}>
          <rect
            x={-bodyLen / 2 + bandSpacing * (i + 1) - bandW / 2}
            y={-bodyH / 2}
            width={bandW} height={bodyH}
            fill={bandColor} rx={0.3}
          />
          {/* Band highlight */}
          <rect
            x={-bodyLen / 2 + bandSpacing * (i + 1) - bandW / 2}
            y={-bodyH / 2}
            width={bandW} height={bodyH * 0.3}
            fill="#FFFFFF" opacity={0.15} rx={0.3}
          />
        </g>
      ))}
    </g>
  )
}

function LedSVG({ comp, selected, onTap, compSolution }) {
  const a = holeCoords(comp.holeA) // anode
  const b = holeCoords(comp.holeB) // cathode
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const size = 7
  const color = LED_COLORS[comp.ledColor] || LED_COLORS.red

  // LED glow when current is flowing
  const isLit = compSolution && compSolution.currentThrough > 0.001
  const glowIntensity = isLit ? Math.min(compSolution.currentThrough / 0.02, 1.5) : 0
  const glowRadius = 10 + glowIntensity * 6

  return (
    <g
      transform={`translate(${mx},${my}) rotate(${angle})`}
      className={`cursor-pointer ${selected ? 'comp-shake' : ''}`}
      onClick={() => onTap?.(comp.id)}
      filter={isLit ? undefined : 'url(#componentShadow)'}
    >
      {/* Wider invisible hit area */}
      <rect x={-len / 2} y={-12} width={len} height={24} fill="transparent" />

      {/* LED glow halos (double layer for richness) */}
      {isLit && (
        <>
          <circle cx={0} cy={0} r={glowRadius + 4}
            fill={color} opacity={glowIntensity * 0.12}
            className="led-glow pointer-events-none" />
          <circle cx={0} cy={0} r={glowRadius}
            fill={color} opacity={glowIntensity * 0.25}
            className="led-glow pointer-events-none" />
        </>
      )}

      {/* Metal leads */}
      <line x1={-len / 2} y1={0} x2={-size - 1} y2={0}
        stroke="url(#metalLead)" strokeWidth={1.2} />
      <line x1={size + 1} y1={0} x2={len / 2} y2={0}
        stroke="url(#metalLead)" strokeWidth={1.2} />

      {/* Cathode flat base */}
      <rect x={size - 2} y={-size + 1} width={3} height={(size - 1) * 2}
        fill={selected ? '#FFA000' : '#888'} rx={0.5} />

      {/* LED dome body (ellipse for simplicity) */}
      <ellipse cx={-1} cy={0} rx={size} ry={size - 1}
        fill={selected ? '#FFC107' : color}
        opacity={isLit ? 0.9 : 0.45}
        stroke={selected ? '#FFA000' : color}
        strokeWidth={0.5}
        style={isLit ? { filter: `drop-shadow(0 0 ${3 + glowIntensity * 4}px ${color})` } : {}}
      />

      {/* Frosted plastic highlight (catch-light) */}
      <ellipse cx={-3} cy={-2.5} rx={size * 0.4} ry={size * 0.28}
        fill="#FFFFFF" opacity={isLit ? 0.3 : 0.15}
        className="pointer-events-none" />

      {/* Inner glow when lit */}
      {isLit && (
        <ellipse cx={-1} cy={0} rx={size * 0.5} ry={size * 0.4}
          fill={color} opacity={0.4}
          className="pointer-events-none" />
      )}

      {/* Polarity marker */}
      <text
        x={-size - 4} y={-2}
        fill="#888" fontSize={5} fontWeight="bold"
        textAnchor="middle" className="select-none pointer-events-none"
      >
        +
      </text>
    </g>
  )
}

const RENDERERS = {
  wire: WireSVG,
  resistor: ResistorSVG,
  led: LedSVG,
}

export default function ComponentRenderer({ components, selectedId, onTap, solution }) {
  return (
    <g>
      {components.map((comp) => {
        const Renderer = RENDERERS[comp.kind]
        if (!Renderer) return null
        return (
          <Renderer
            key={comp.id}
            comp={comp}
            selected={comp.id === selectedId}
            onTap={onTap}
            compSolution={solution?.components?.[comp.id]}
          />
        )
      })}
    </g>
  )
}
