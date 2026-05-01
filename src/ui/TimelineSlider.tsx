import { useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { useGameStore, TIMELINE_INDEX, TIMELINES } from '@/store/gameStore'
import type { Timeline } from '@/store/gameStore'
import { cn } from '@/lib/utils'

const STOPS: { t: Timeline; label: string; sub: string }[] = [
  { t: 'pre', label: 'Pre', sub: 'Targeting · Stakeholders' },
  { t: 'hack', label: 'Hackathon', sub: 'Value · Formats · Execution' },
  { t: 'post', label: 'Post', sub: 'Scale · Measurement' },
]

export function TimelineSlider() {
  const timeline = useGameStore((s) => s.timeline)
  const beginTransitionTo = useGameStore((s) => s.beginTransitionTo)
  const isTransitioning = useGameStore((s) => s.isTransitioning)

  // keyboard 1/2/3
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.code === 'Digit1' || e.key === '1') beginTransitionTo('pre')
      if (e.code === 'Digit2' || e.key === '2') beginTransitionTo('hack')
      if (e.code === 'Digit3' || e.key === '3') beginTransitionTo('post')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [beginTransitionTo])

  const idx = TIMELINE_INDEX[timeline]

  const handleChange = (v: number[]) => {
    const target = TIMELINES[v[0]]
    if (target && target !== timeline) beginTransitionTo(target)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(720px,calc(100vw-3rem))]">
        <div className="glass rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">Timeline</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              keys&nbsp;·&nbsp;<kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">1</kbd>&nbsp;<kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">2</kbd>&nbsp;<kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">3</kbd>
            </span>
          </div>
          <Slider value={[idx]} min={0} max={2} step={1} onValueChange={handleChange} className={cn(isTransitioning && 'opacity-70')} />
          <div className="mt-3 flex justify-between">
            {STOPS.map((stop, i) => {
              const active = i === idx
              return (
                <Tooltip key={stop.t}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => beginTransitionTo(stop.t)}
                      className={cn(
                        'group flex flex-col items-start gap-0.5 rounded-md px-2 py-1 transition-all',
                        active ? 'opacity-100' : 'opacity-50 hover:opacity-90'
                      )}
                    >
                      <span
                        className={cn(
                          'text-xs font-display font-semibold uppercase tracking-wide',
                          active ? 'text-white' : 'text-white/70'
                        )}
                      >
                        {stop.label}
                      </span>
                      <span className="text-[10px] text-white/50 hidden sm:block">{stop.sub}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    Jump to {stop.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
