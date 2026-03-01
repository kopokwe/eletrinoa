import { computeReading } from '@/lib/multimeterCompute'

const MODES = [
  { id: 'V', label: 'V', description: 'Voltaje' },
  { id: 'A', label: 'A', description: 'Corriente' },
  { id: 'ohm', label: 'Ω', description: 'Resistencia' },
  { id: 'continuity', label: '🔊', description: 'Continuidad' },
]

export default function VirtualMultimeter({
  meterMode,
  onModeChange,
  probeA,
  probeB,
  onSelectProbe,
  activeProbe,
  components,
  solution,
}) {
  const reading = computeReading(meterMode, probeA, probeB, components, solution)

  return (
    <div className="rounded-lg border border-secondary bg-secondary/20 p-3 space-y-3">
      {/* Mode selector */}
      <div className="flex gap-1">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`
              flex-1 py-1.5 rounded-md text-xs font-bold transition-all
              ${meterMode === mode.id
                ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* LCD Display */}
      <div className="bg-[#0a1a0a] rounded-lg p-3 border border-green-900/50">
        <div
          className="text-right font-mono text-2xl tracking-wider"
          style={{ color: '#39ff14', textShadow: '0 0 8px #39ff1466' }}
        >
          {reading.display}
        </div>
        <div className="text-right text-[10px] text-green-700 mt-0.5 font-mono">
          {MODES.find((m) => m.id === meterMode)?.description || ''} DC
        </div>
      </div>

      {/* Probe buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onSelectProbe('A')}
          className={`
            flex-1 py-2 rounded-lg text-xs font-semibold transition-all
            ${activeProbe === 'A'
              ? 'bg-red-500/30 text-red-400 ring-2 ring-red-500 animate-pulse'
              : probeA
              ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30'
              : 'bg-secondary/50 text-muted-foreground'
            }
          `}
        >
          🔴 Punta Roja {probeA ? `(${probeA})` : ''}
        </button>
        <button
          onClick={() => onSelectProbe('B')}
          className={`
            flex-1 py-2 rounded-lg text-xs font-semibold transition-all
            ${activeProbe === 'B'
              ? 'bg-blue-500/30 text-blue-400 ring-2 ring-blue-500 animate-pulse'
              : probeB
              ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30'
              : 'bg-secondary/50 text-muted-foreground'
            }
          `}
        >
          ⚫ Punta Negra {probeB ? `(${probeB})` : ''}
        </button>
      </div>

      {/* Instruction hint */}
      {activeProbe && (
        <p className="text-[10px] text-amber-400 text-center animate-pulse">
          Toca un agujero para colocar la punta {activeProbe === 'A' ? 'roja' : 'negra'}
        </p>
      )}
    </div>
  )
}
