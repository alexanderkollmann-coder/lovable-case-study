import { motion } from 'framer-motion'

export function LoadingSplash({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-5xl md:text-6xl font-semibold tracking-tight"
        >
          <span className="text-white">Lovable</span>
          <span className="text-primary"> · </span>
          <span className="text-white/80">Hackathon Explorer</span>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="mt-6 h-px bg-gradient-to-r from-pre-500 via-hack-500 to-post-500 mx-auto max-w-md"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-xs uppercase tracking-[0.28em] text-white/50"
        >
          Building enterprise hackathons, end-to-end
        </motion.p>
      </div>
    </motion.div>
  )
}
