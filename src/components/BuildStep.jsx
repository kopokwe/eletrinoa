import { Card, CardContent } from '@/components/ui/card'

export default function BuildStep({ step, icon, children, warning, color }) {
  return (
    <Card className="border-l-4" style={{ borderLeftColor: color }}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ backgroundColor: color + '22', color }}
          >
            {step}
          </div>
          <div className="space-y-2 flex-1">
            <div className="text-sm leading-relaxed">{children}</div>
            {warning && (
              <div className="text-sm bg-amber-500/10 text-amber-400 p-2 rounded flex items-start gap-2">
                <span className="shrink-0">⚠️</span>
                <span>{warning}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
