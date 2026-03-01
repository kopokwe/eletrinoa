import { useState } from 'react'

// Digit-to-segment mapping
export const DIGIT_SEGMENTS = {
  0: ['a', 'b', 'c', 'd', 'e', 'f'],
  1: ['b', 'c'],
  2: ['a', 'b', 'd', 'e', 'g'],
  3: ['a', 'b', 'c', 'd', 'g'],
  4: ['b', 'c', 'f', 'g'],
  5: ['a', 'c', 'd', 'f', 'g'],
  6: ['a', 'c', 'd', 'e', 'f', 'g'],
  7: ['a', 'b', 'c'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g'],
}

// SVG polygon points for each segment (viewBox 0 0 80 140)
const SEGMENT_POLYS = {
  a: '17,2 63,2 57,12 23,12',
  b: '65,7 75,17 73,63 63,68',
  c: '63,72 73,77 75,123 65,133',
  d: '23,128 57,128 63,138 17,138',
  e: '7,77 17,72 15,123 5,133',
  f: '5,7 15,17 17,63 7,68',
  g: '17,65 63,65 68,70 63,75 17,75 12,70',
}

const SEGMENT_LABELS = {
  a: [40, 8], b: [72, 40], c: [72, 100], d: [40, 134],
  e: [8, 100], f: [8, 40], g: [40, 70],
}

export default function Seg7Display({
  activeSegments = [],
  onSegmentClick,
  showLabels = false,
  activeColor = '#ef4444',
  size = 140,
  className = '',
}) {
  const active = new Set(activeSegments)
  const scale = size / 140

  return (
    <svg
      viewBox="0 0 90 145"
      width={80 * scale}
      height={140 * scale}
      className={className}
    >
      {Object.entries(SEGMENT_POLYS).map(([seg, points]) => (
        <polygon
          key={seg}
          points={points}
          fill={active.has(seg) ? activeColor : '#1e293b'}
          stroke={active.has(seg) ? activeColor : '#334155'}
          strokeWidth="0.5"
          opacity={active.has(seg) ? 1 : 0.4}
          className={onSegmentClick ? 'cursor-pointer hover:opacity-80' : ''}
          onClick={() => onSegmentClick?.(seg)}
          style={{ transition: 'fill 0.2s, opacity 0.2s' }}
        />
      ))}
      {/* Decimal point */}
      <circle
        cx="82" cy="135" r="4"
        fill={active.has('dp') ? activeColor : '#1e293b'}
        stroke={active.has('dp') ? activeColor : '#334155'}
        strokeWidth="0.5"
        opacity={active.has('dp') ? 1 : 0.4}
        className={onSegmentClick ? 'cursor-pointer hover:opacity-80' : ''}
        onClick={() => onSegmentClick?.('dp')}
      />
      {/* Segment labels */}
      {showLabels && Object.entries(SEGMENT_LABELS).map(([seg, [x, y]]) => (
        <text
          key={seg}
          x={x} y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={active.has(seg) ? '#fff' : '#94a3b8'}
          fontSize="10"
          fontWeight="bold"
          className="select-none pointer-events-none"
        >
          {seg}
        </text>
      ))}
    </svg>
  )
}
