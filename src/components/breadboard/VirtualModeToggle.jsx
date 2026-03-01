import { useState } from 'react'

export default function VirtualModeToggle({ color, children }) {
  const [mode, setMode] = useState('fisico')

  return (
    <div>
      {/* Toggle pill */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-full bg-secondary/50 p-0.5">
          <button
            onClick={() => setMode('fisico')}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium transition-all
              ${mode === 'fisico'
                ? 'text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            style={mode === 'fisico' ? { backgroundColor: color } : {}}
          >
            🔧 Físico
          </button>
          <button
            onClick={() => setMode('virtual')}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium transition-all
              ${mode === 'virtual'
                ? 'text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            style={mode === 'virtual' ? { backgroundColor: color } : {}}
          >
            🖥️ Virtual
          </button>
        </div>
      </div>

      {/* Render the appropriate mode */}
      {children(mode)}
    </div>
  )
}
