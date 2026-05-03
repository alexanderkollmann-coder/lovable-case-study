import { Slider } from '@/components/ui/slider'
import { useGameStore, TIMELINE_INDEX, PALETTES, type Timeline } from '@/store/gameStore'
import { cn } from '@/lib/utils'

const STOPS: { t: Timeline; label: string; sub: string }[] = [
  { t: 'pre', label: 'Pre', sub: 'Value Prop · Targeting' },
  { t: 'hack', label: 'Hackathon', sub: 'Formats · Execution' },
  { t: 'post', label: 'Post', sub: 'GTM · Measurement · Scale' },
]

/**
 * Read-only timeline indicator. The only way to change timelines is to walk the avatar
 * across a zone boundary. The slider styling adapts to the active palette mood so it stays
 * legible in both dark and light themes.
 */
export function TimelineSlider() {
  const timeline = useGameStore((s) => s.timeline)
  const isTransitioning = useGameStore((s) => s.isTransitioning)
  const palette = useGameStore((s) => s.palette)
  const mood = PALETTES[palette].mood
  const idx = TIMELINE_INDEX[timeline]

  const isLight = mood === 'light'

  // Inline-styled "panel" so we can pick contrasting colour exactly per mood
  const panelStyle = isLight
    ? {
        background: 'rgba(20, 22, 30, 0.72)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      }
    : {
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      }

  // Always white text inside the panel — the panel itself contrasts with the background
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(720px,calc(100vw-3rem))]">
      <div className="rounded-2xl px-6 py-4 shadow-2xl" style={panelStyle}>
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/65">Timeline</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">walk to change</span>
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
                  active ? 'opacity-100' : 'opacity-55'
                )}
              >
                <span
                  className={cn(
                    'text-xs font-display font-semibold uppercase tracking-wide',
                    active ? 'text-white' : 'text-white/75'
                  )}
                >
                  {stop.label}
                </span>
                <span className="text-[10px] text-white/55 hidden sm:block">{stop.sub}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
