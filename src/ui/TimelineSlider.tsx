import { Slider } from '@/components/ui/slider'
import { useGameStore, TIMELINE_INDEX, type Timeline } from '@/store/gameStore'
import { cn } from '@/lib/utils'

const STOPS: { t: Timeline; label: string; sub: string }[] = [
  { t: 'pre', label: 'Pre', sub: 'Value Prop · Targeting' },
  { t: 'hack', label: 'Hackathon', sub: 'Formats · Execution' },
  { t: 'post', label: 'Post', sub: 'GTM · Measurement · Scale' },
]

/**
 * Read-only timeline indicator. Per spec, the only way to change timelines is to walk the avatar
 * across a zone boundary — no keyboard, no click-to-jump. The slider just reflects the current state.
 */
export function TimelineSlider() {
  const timeline = useGameStore((s) => s.timeline)
  const isTransitioning = useGameStore((s) => s.isTransitioning)
  const idx = TIMELINE_INDEX[timeline]

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(720px,calc(100vw-3rem))]">
      <div className="glass rounded-2xl px-6 py-4 shadow-2xl">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">Timeline</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">walk to change</span>
        </div>
        <div className={cn(isTransitioning && 'opacity-70', 'pointer-events-none')}>
          <Slider value={[idx]} min={0} max={2} step={1} disabled />
        </div>
        <div className="mt-3 flex justify-between">
          {STOPS.map((stop, i) => {
            const active = i === idx
            return (
              <div
                key={stop.t}
                className={cn(
                  'group flex flex-col items-start gap-0.5 rounded-md px-2 py-1',
                  active ? 'opacity-100' : 'opacity-50'
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
