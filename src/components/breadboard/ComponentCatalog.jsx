import { CATALOG_ITEMS, resistorBands, LED_COLORS } from '@/data/componentCatalog'

// Tiny SVG previews matching the skeuomorphic component style
function MiniWire() {
  return (
    <svg viewBox="0 0 36 16" className="w-9 h-4">
      <path d="M 2,10 Q 18,2 34,10" fill="none" stroke="#00000030" strokeWidth={4} strokeLinecap="round" />
      <path d="M 2,10 Q 18,2 34,10" fill="none" stroke="#DC2626" strokeWidth={3} strokeLinecap="round" />
      <path d="M 2,10 Q 18,2 34,10" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.15} />
      <path d="M 2,10 Q 18,2 34,10" fill="none" stroke="#DC2626" strokeWidth={2} strokeLinecap="round" />
      <circle cx={2} cy={10} r={1.8} fill="#C0C0C0" stroke="#888" strokeWidth={0.4} />
      <circle cx={34} cy={10} r={1.8} fill="#C0C0C0" stroke="#888" strokeWidth={0.4} />
    </svg>
  )
}

function MiniResistor({ value }) {
  const bands = resistorBands(value || 0)
  const bodyW = 16
  const bodyH = 7
  const x0 = 10
  const bandW = 2.2
  const bandSpacing = bodyW / (bands.length + 1)
  return (
    <svg viewBox="0 0 36 16" className="w-9 h-4">
      <line x1={2} y1={8} x2={x0} y2={8} stroke="#777" strokeWidth={1.5} />
      <line x1={x0 + bodyW} y1={8} x2={34} y2={8} stroke="#777" strokeWidth={1.5} />
      <rect x={x0} y={8 - bodyH / 2} width={bodyW} height={bodyH}
        fill="#D4A574" rx={bodyH / 2} stroke="#8B7355" strokeWidth={0.4} />
      <rect x={x0 + 1} y={8 - bodyH / 2 + 0.5} width={bodyW - 2} height={bodyH * 0.3}
        fill="#FFFFFF" opacity={0.12} rx={1.5} />
      {bands.map((color, i) => (
        <rect key={i}
          x={x0 + bandSpacing * (i + 1) - bandW / 2}
          y={8 - bodyH / 2}
          width={bandW} height={bodyH}
          fill={color} rx={0.3} />
      ))}
    </svg>
  )
}

function MiniLed({ color }) {
  const fill = LED_COLORS[color] || LED_COLORS.red
  return (
    <svg viewBox="0 0 36 16" className="w-9 h-4">
      <line x1={2} y1={8} x2={11} y2={8} stroke="#777" strokeWidth={1.2} />
      <line x1={25} y1={8} x2={34} y2={8} stroke="#777" strokeWidth={1.2} />
      <rect x={22} y={3} width={3} height={10} fill="#888" rx={0.5} />
      <ellipse cx={17} cy={8} rx={7} ry={5.5} fill={fill} opacity={0.7} />
      <ellipse cx={15} cy={6} rx={3} ry={2} fill="#FFFFFF" opacity={0.2} />
    </svg>
  )
}

function MiniPreview({ item }) {
  if (item.kind === 'wire') return <MiniWire />
  if (item.kind === 'resistor') return <MiniResistor value={item.value} />
  if (item.kind === 'led') return <MiniLed color={item.ledColor} />
  return null
}

const CATEGORIES = [
  { label: 'Cables', filter: (i) => i.kind === 'wire' },
  { label: 'Resistencias', filter: (i) => i.kind === 'resistor' },
  { label: 'LEDs', filter: (i) => i.kind === 'led' },
]

export default function ComponentCatalog({ selected, onSelect, onDeselect }) {
  return (
    <div className="space-y-2 rounded-xl bg-slate-900/50 border border-slate-700/40 p-2.5">
      {CATEGORIES.map((cat) => {
        const items = CATALOG_ITEMS.filter(cat.filter)
        return (
          <div key={cat.label}>
            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider pl-0.5">
              {cat.label}
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {items.map((item, i) => {
                const key = `${item.kind}-${item.value || item.ledColor || i}`
                const isSelected = selected &&
                  selected.kind === item.kind &&
                  selected.value === item.value &&
                  selected.ledColor === item.ledColor

                return (
                  <button
                    key={key}
                    onClick={() => isSelected ? onDeselect() : onSelect(item)}
                    className={`
                      flex-shrink-0 flex flex-col items-center gap-0.5
                      rounded-lg px-2.5 py-1.5 min-w-[54px]
                      transition-all duration-150
                      ${isSelected
                        ? 'bg-amber-400/15 ring-2 ring-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]'
                        : 'bg-gradient-to-b from-slate-700/80 to-slate-800/80 text-slate-300 border border-slate-600/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:from-slate-600/80 hover:to-slate-700/80 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]'
                      }
                    `}
                  >
                    <MiniPreview item={item} />
                    <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
