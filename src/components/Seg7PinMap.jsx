import { useState } from 'react'
import Seg7Display from './Seg7Display'

// TDSR 5160 G pin mapping (common cathode)
// Pin numbering: bottom row L→R = 1-5, top row L→R = 6-10
const PIN_MAP = {
  1: { segment: 'e', label: 'e' },
  2: { segment: 'd', label: 'd' },
  3: { segment: null, label: 'GND' },
  4: { segment: 'c', label: 'c' },
  5: { segment: 'dp', label: 'dp' },
  6: { segment: 'b', label: 'b' },
  7: { segment: 'a', label: 'a' },
  8: { segment: null, label: 'GND' },
  9: { segment: 'f', label: 'f' },
  10: { segment: 'g', label: 'g' },
}

export default function Seg7PinMap({ color = '#c084fc' }) {
  const [activePin, setActivePin] = useState(null)
  const [revealed, setRevealed] = useState(new Set())

  const pinInfo = activePin ? PIN_MAP[activePin] : null
  const highlightedSegment = pinInfo?.segment ? [pinInfo.segment] : []

  const togglePin = (pin) => {
    setActivePin(activePin === pin ? null : pin)
    setRevealed((prev) => new Set([...prev, pin]))
  }

  // Bottom row: pins 1-5 (left to right from front view)
  const bottomPins = [1, 2, 3, 4, 5]
  // Top row: pins 10-6 (left to right from front view, numbering goes 10,9,8,7,6)
  const topPins = [10, 9, 8, 7, 6]

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground italic">
        Usa esto como referencia, pero intenta verificar cada pin con el Venlab.
        La diferencia entre mirar un mapa y explorar el terreno es lo que separa a los turistas de los exploradores
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* DIP Package */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 min-w-[200px]">
          <p className="text-[10px] text-center text-muted-foreground mb-2">
            Vista frontal (muesca arriba)
          </p>

          {/* Notch indicator */}
          <div className="flex justify-center mb-2">
            <div className="w-6 h-3 border-2 border-gray-600 rounded-b-full" />
          </div>

          {/* Top row of pins */}
          <div className="flex justify-between px-2 mb-6">
            {topPins.map((pin) => {
              const info = PIN_MAP[pin]
              const isGnd = info.segment === null
              const isActive = activePin === pin
              return (
                <button
                  key={pin}
                  onClick={() => togglePin(pin)}
                  className={`w-8 h-8 rounded text-[10px] font-mono font-bold transition-all ${
                    isActive
                      ? 'text-white ring-2 ring-offset-1 ring-offset-gray-900'
                      : isGnd
                      ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  style={isActive ? { backgroundColor: color, ringColor: color } : undefined}
                >
                  {pin}
                </button>
              )
            })}
          </div>

          {/* DIP body */}
          <div className="bg-gray-800 border border-gray-600 rounded mx-1 h-12 flex items-center justify-center">
            <span className="text-[9px] text-gray-500 font-mono">TDSR 5160</span>
          </div>

          {/* Bottom row of pins */}
          <div className="flex justify-between px-2 mt-6">
            {bottomPins.map((pin) => {
              const info = PIN_MAP[pin]
              const isGnd = info.segment === null
              const isActive = activePin === pin
              return (
                <button
                  key={pin}
                  onClick={() => togglePin(pin)}
                  className={`w-8 h-8 rounded text-[10px] font-mono font-bold transition-all ${
                    isActive
                      ? 'text-white ring-2 ring-offset-1 ring-offset-gray-900'
                      : isGnd
                      ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  style={isActive ? { backgroundColor: color, ringColor: color } : undefined}
                >
                  {pin}
                </button>
              )
            })}
          </div>
        </div>

        {/* Live segment preview */}
        <div className="flex flex-col items-center gap-2">
          <Seg7Display
            activeSegments={highlightedSegment}
            showLabels
            activeColor={color}
            size={120}
          />
          {pinInfo && (
            <p className="text-sm font-mono text-center" style={{ color }}>
              Pin {activePin} → {pinInfo.segment ? `segmento ${pinInfo.segment}` : 'Cátodo común (GND)'}
            </p>
          )}
          {!pinInfo && (
            <p className="text-xs text-muted-foreground text-center">
              Toca un pin para ver qué segmento ilumina
            </p>
          )}
        </div>
      </div>

      {/* Pin summary table */}
      <div className="bg-card rounded-lg p-3">
        <p className="text-xs font-semibold mb-2">Mapa de pines descubierto:</p>
        <div className="grid grid-cols-5 gap-1 text-[10px] font-mono text-center">
          {[1,2,3,4,5,6,7,8,9,10].map((pin) => {
            const info = PIN_MAP[pin]
            const isRevealed = revealed.has(pin)
            return (
              <div
                key={pin}
                className={`rounded p-1 ${
                  isRevealed
                    ? info.segment === null ? 'bg-amber-900/30 text-amber-400' : 'bg-secondary text-foreground'
                    : 'bg-gray-800 text-gray-600'
                }`}
              >
                <div className="font-bold">Pin {pin}</div>
                <div>{isRevealed ? info.label : '???'}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
