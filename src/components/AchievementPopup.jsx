import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AchievementPopup({ achievement, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  if (!achievement) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <Card className={`max-w-xs w-full transition-all duration-500 ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
        <CardContent className="pt-6 text-center space-y-3">
          <div className="text-6xl animate-bounce">{achievement.icon}</div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">¡Logro desbloqueado!</p>
          <h2 className="text-xl font-bold">{achievement.name}</h2>
          <p className="text-sm text-muted-foreground">{achievement.trigger}</p>
          <Button onClick={onClose} className="w-full">¡Genial!</Button>
        </CardContent>
      </Card>
    </div>
  )
}
