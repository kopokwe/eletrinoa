import { MODULES } from '@/data/modules'
import { Button } from '@/components/ui/button'
import ModuleCard from '@/components/ModuleCard'
import ProgressRing from '@/components/ProgressRing'
import { BookOpen, Package, Trophy, FileText, Monitor } from 'lucide-react'

export default function Home({ onNavigate, getModuleProgress, isModuleUnlocked, isModuleComplete, completedCount }) {
  return (
    <div className="min-h-screen bg-background p-4 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">⚡ Eletrinoa</h1>
        <p className="text-sm text-muted-foreground">Laboratorio de Electricidad</p>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-6">
        <ProgressRing completed={completedCount} total={9} />
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        <Button variant="outline" size="sm" className="flex-col h-16 gap-1" onClick={() => onNavigate('formulas')}>
          <BookOpen className="h-4 w-4" />
          <span className="text-[10px]">Fórmulas</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-col h-16 gap-1" onClick={() => onNavigate('inventory')}>
          <Package className="h-4 w-4" />
          <span className="text-[10px]">Inventario</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-col h-16 gap-1" onClick={() => onNavigate('virtual-lab')}>
          <Monitor className="h-4 w-4" />
          <span className="text-[10px]">Lab Virtual</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-col h-16 gap-1" onClick={() => onNavigate('achievements')}>
          <Trophy className="h-4 w-4" />
          <span className="text-[10px]">Logros</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-col h-16 gap-1"
          onClick={() => onNavigate('exam')}
          disabled={!isModuleComplete(7)}
        >
          <FileText className="h-4 w-4" />
          <span className="text-[10px]">Examen</span>
        </Button>
      </div>

      {/* Module List */}
      <div className="space-y-2">
        {MODULES.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            progress={getModuleProgress(mod.id)}
            locked={!isModuleUnlocked(mod.id)}
            onClick={() => onNavigate(`module-${mod.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
