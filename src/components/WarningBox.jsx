import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function WarningBox({ children }) {
  return (
    <Card className="border-amber-500 bg-amber-500/10">
      <CardContent className="pt-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-200">{children}</div>
      </CardContent>
    </Card>
  )
}
