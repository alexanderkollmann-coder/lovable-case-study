import { useEffect, useState } from 'react'
import boothMeta from '@/content/booths.config'
import { useGameStore } from '@/store/gameStore'
import type { BoothId } from '@/content/booths.config'
import { motion } from 'framer-motion'

export function ProgressTracker() {
  const activeBoothId = useGameStore((s) => s.activeBoothId)
  const [visited, setVisited] = useState<Set<BoothId>>(new Set())

  useEffect(() => {
    if (activeBoothId) {
      setVisited((prev) => {
        if (prev.has(activeBoothId)) return prev
        const next = new Set(prev)
        next.add(activeBoothId)
        return next
      })
    }
  }, [activeBoothId])

  const total = boothMeta.length
  const done = visited.size

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 flex items-center gap-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-mono">
        {done} / {total} booths
      </div>
      <div className="flex gap-1">
        {boothMeta.map((b) => {
          const isVisited = visited.has(b.id)
          const isActive = activeBoothId === b.id
          return (
            <motion.div
              key={b.id}
              animate={{
                opacity: isActive ? 1 : isVisited ? 0.85 : 0.3,
                scale: isActive ? 1.18 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="w-2 h-2 rounded-full"
              style={{
                background: isVisited ? b.accent : 'rgba(255,255,255,0.25)',
                boxShadow: isVisited ? `0 0 10px ${b.accent}99` : 'none',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
