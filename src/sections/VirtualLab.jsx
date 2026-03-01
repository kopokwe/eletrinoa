import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import BreadboardSimulator from '@/components/breadboard/BreadboardSimulator'

export default function VirtualLab({ onBack }) {
  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver
      </Button>

      <h1 className="text-xl font-bold mb-1 text-cyan-400">
        🖥️ Lab Virtual
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        Monta circuitos en tu breadboard virtual Ariston
      </p>

      <BreadboardSimulator />
    </div>
  )
}
