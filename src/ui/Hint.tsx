import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export function Hint() {
  const hasSeen = useGameStore((s) => s.hasSeenHint)
  const dismiss = useGameStore((s) => s.dismissHint)
  return (
    <AnimatePresence>
      {!hasSeen && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="pointer-events-auto fixed top-1/2 left-6 -translate-y-1/2 max-w-[260px]"
        >
          <div className="glass rounded-xl px-5 py-4 shadow-2xl">
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2">How to explore</div>
            <ul className="space-y-2 text-sm text-white/80 mb-4">
              <li className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs">W A S D</kbd>
                <span>or click to walk</span>
              </li>
              <li className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs">E</kbd>
                <span>open a booth</span>
              </li>
              <li className="flex items-center gap-2 leading-tight">
                <span className="text-xs">↔︎</span>
                <span>walk between zones · or press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs">1 2 3</kbd></span>
              </li>
            </ul>
            <button
              onClick={dismiss}
              className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-[0.18em]"
            >
              Got it →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
