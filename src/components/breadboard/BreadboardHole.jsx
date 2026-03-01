import { HOLE_RADIUS } from '@/lib/breadboard'

const TOUCH_RADIUS = 8 // 44px touch target at typical SVG scale

export default function BreadboardHole({ x, y, id, isPending, isOccupied, onTap }) {
  const gradientId = isPending ? 'holePending' : isOccupied ? 'holeOccupied' : 'holeDefault'
  const rimColor = isPending ? '#DAA520' : isOccupied ? '#8B6B4A' : '#A0A0A0'

  return (
    <g>
      {/* Invisible touch target (larger than visual hole) */}
      <circle
        cx={x} cy={y} r={TOUCH_RADIUS}
        fill="transparent"
        className="cursor-pointer"
        onClick={() => onTap(id)}
      />
      {/* Metallic outer rim */}
      <circle
        cx={x} cy={y} r={HOLE_RADIUS + 0.8}
        fill={rimColor}
        className="pointer-events-none"
      />
      {/* Concave hole with radial gradient */}
      <circle
        cx={x} cy={y} r={HOLE_RADIUS}
        fill={`url(#${gradientId})`}
        filter="url(#holeShadow)"
        className="pointer-events-none"
      />
      {/* Specular highlight dot (metallic reflection) */}
      <circle
        cx={x - 0.8} cy={y - 0.8} r={0.7}
        fill="#FFFFFF"
        opacity={isPending ? 0.5 : 0.2}
        className="pointer-events-none"
      />
      {/* Pending glow ring */}
      {isPending && (
        <circle
          cx={x} cy={y} r={HOLE_RADIUS + 3.5}
          fill="none"
          stroke="#FFD700"
          strokeWidth={1.2}
          opacity={0.7}
          className="pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 3px #FFD70088)' }}
        />
      )}
    </g>
  )
}
