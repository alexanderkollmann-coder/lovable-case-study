import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useGameStore } from '@/store/gameStore'
import { getBooth } from '@/content/booths.config'
import {
  Target,
  Users,
  Sparkles,
  LayoutGrid,
  Zap,
  TrendingUp,
  Gauge,
} from 'lucide-react'

const ICON_MAP = {
  target: Target,
  users: Users,
  sparkles: Sparkles,
  layout: LayoutGrid,
  zap: Zap,
  'trending-up': TrendingUp,
  gauge: Gauge,
}

export function BoothPanel() {
  const activeId = useGameStore((s) => s.activeBoothId)
  const closeBooth = useGameStore((s) => s.closeBooth)
  const [content, setContent] = useState<string>('')
  const meta = getBooth(activeId)
  const isOpen = activeId !== null

  useEffect(() => {
    if (!meta) {
      setContent('')
      return
    }
    let cancelled = false
    meta.load().then((m) => {
      if (!cancelled) setContent(m.default ?? '')
    })
    return () => {
      cancelled = true
    }
  }, [meta])

  // Esc to close
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeBooth()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeBooth])

  if (!meta) {
    return (
      <Sheet open={false} onOpenChange={(open) => !open && closeBooth()}>
        <SheetContent />
      </Sheet>
    )
  }

  const Icon = ICON_MAP[meta.iconName]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeBooth()}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 overflow-hidden"
      >
        <div
          className="px-8 pt-8 pb-6 border-b border-white/5 relative"
          style={{
            background: `linear-gradient(135deg, ${meta.accent}26 0%, transparent 70%)`,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                background: `${meta.accent}1f`,
                border: `1px solid ${meta.accent}55`,
                color: meta.accent,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
              Booth · {meta.timeline === 'pre' ? 'Pre' : meta.timeline === 'hack' ? 'Hackathon' : 'Post'}-Hackathon
            </div>
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground tracking-tight">
            {meta.label}
          </h1>
          <p className="mt-2 text-sm text-white/60 max-w-md">{meta.subtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {content ? (
            <article className="booth-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
          ) : (
            <div className="flex items-center justify-center h-32 text-white/40 text-sm">Loading…</div>
          )}
        </div>

        <div className="px-8 py-4 border-t border-white/5 bg-black/30 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-white/40">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono">Esc</kbd>
              <span>close</span>
            </div>
            <span className="font-mono uppercase tracking-[0.18em]">Lovable · Hackathon Explorer</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
