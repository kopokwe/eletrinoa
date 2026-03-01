import { Card, CardContent } from '@/components/ui/card'

export default function FormulaCard({ name, formula, description }) {
  return (
    <Card>
      <CardContent className="pt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{name}</p>
        <p className="font-mono text-lg font-bold">{formula}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}
