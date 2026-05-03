import { Pause, Play } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

/**
 * Tiny bottom-right button that pauses the R3F render loop (frameloop="never").
 * Stops all per-frame work — useful while typing in chat to keep the laptop cool.
 */
export function RenderPauseToggle() {
  const paused = useGameStore((s) => s.renderPaused)
  const toggle = useGameStore((s) => s.toggleRenderPaused)
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? 'Resume rendering' : 'Pause rendering'}
            className="pointer-events-auto fixed bottom-3 right-3 w-7 h-7 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors z-50"
          >
            {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          {paused ? 'Resume rendering' : 'Pause rendering (saves CPU/GPU)'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
