import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

export default function TheoryBlock({ title, pageRef, children, color }) {
  return (
    <Card className="border-l-4" style={{ borderLeftColor: color }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5" style={{ color }} />
          {title}
        </CardTitle>
        {pageRef && (
          <p className="text-xs text-muted-foreground">
            📓 Mira la página {pageRef} de tus apuntes
          </p>
        )}
      </CardHeader>
      <CardContent className="text-sm leading-relaxed space-y-3">
        {children}
      </CardContent>
    </Card>
  )
}
