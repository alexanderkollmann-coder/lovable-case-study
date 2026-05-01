import { useGameStore, TIMELINE_LABEL, TIMELINE_SUBTITLE, TIMELINE_COLORS } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

export function Hud() {
  const timeline = useGameStore((s) => s.timeline)
  const palette = TIMELINE_COLORS[timeline]

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={timeline}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <div
            className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance"
            style={{ color: palette.accent, textShadow: `0 0 24px ${palette.accent}66` }}
          >
            {TIMELINE_LABEL[timeline]}
          </div>
          <div className="mt-1 text-xs md:text-sm text-white/60 tracking-[0.18em] uppercase">
            {TIMELINE_SUBTITLE[timeline]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
