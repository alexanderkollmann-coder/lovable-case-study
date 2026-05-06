import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { getBooth } from '@/content/booths.config'
import { DECKS } from '@/content/decks'

const ACTIVE_DECKS = DECKS

export function BoothPanel() {
  const activeId = useGameStore((s) => s.activeBoothId)
  const closeBooth = useGameStore((s) => s.closeBooth)
  const meta = getBooth(activeId)
  const isOpen = activeId !== null
  const deck = activeId ? ACTIVE_DECKS[activeId] : null

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  // reset to slide 0 when booth changes
  useEffect(() => {
    setIndex(0)
    setDirection(1)
  }, [activeId])

  const total = deck?.length ?? 0
  const next = useCallback(() => {
    if (!deck) return
    setDirection(1)
    setIndex((i) => Math.min(i + 1, deck.length - 1))
  }, [deck])
  const prev = useCallback(() => {
    if (!deck) return
    setDirection(-1)
    setIndex((i) => Math.max(i - 1, 0))
  }, [deck])

  // keyboard nav
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeBooth()
      else if (e.code === 'ArrowRight' || e.code === 'Space') {
        e.preventDefault()
        next()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeBooth, next, prev])

  if (!isOpen || !meta || !deck) return null

  const slide = deck[index]

  return (
    <AnimatePresence>
      <motion.div
        key="booth-overlay"
        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top chrome */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: meta.accent, boxShadow: `0 0 12px ${meta.accent}` }}
            />
            <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/60">
              Booth · {meta.label}
            </div>
            {slide.kicker && (
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
                · {slide.kicker}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[11px] font-mono text-white/50">
              <span style={{ color: meta.accent }}>{String(index + 1).padStart(2, '0')}</span>
              <span className="text-white/30"> / {String(total).padStart(2, '0')}</span>
            </div>
            <button
              onClick={closeBooth}
              className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide stage */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {slide.render()}
            </motion.div>
          </AnimatePresence>

          {/* Prev */}
          <button
            onClick={prev}
            disabled={index === 0}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full',
              'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all',
              'disabled:opacity-20 disabled:cursor-not-allowed border border-white/10',
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={next}
            disabled={index === total - 1}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full',
              'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all',
              'disabled:opacity-20 disabled:cursor-not-allowed border border-white/10',
            )}
            style={
              index < total - 1
                ? { boxShadow: `0 0 24px ${meta.accent}40` }
                : undefined
            }
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom chrome — dots + hint */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            {deck.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className="group flex items-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={cn(
                    'h-1 rounded-full transition-all',
                    i === index ? 'w-10' : 'w-4 bg-white/15 group-hover:bg-white/30',
                  )}
                  style={i === index ? { background: meta.accent } : undefined}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60">→</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60">Esc</kbd> close</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
