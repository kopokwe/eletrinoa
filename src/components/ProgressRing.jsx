export default function ProgressRing({ completed, total, size = 120 }) {
  const pct = total > 0 ? completed / total : 0
  const r = (size - 12) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - pct)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={8} className="text-secondary" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#grad)"
          strokeWidth={8}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center -mt-[calc(50%+0.5rem)] mb-8">
        <span className="text-3xl font-bold">{completed}</span>
        <span className="text-muted-foreground text-lg">/{total}</span>
      </div>
      <p className="text-sm text-muted-foreground">módulos completados</p>
    </div>
  )
}
