import { useGameStore, PALETTES } from '@/store/gameStore'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Palette as PaletteIcon } from 'lucide-react'

/**
 * Temporary palette-cycling button. Lets the user flip through visual moods
 * to pick the one that lands best for the final demo. Will be removed.
 */
export function ThemeToggle() {
  const palette = useGameStore((s) => s.palette)
  const cycle = useGameStore((s) => s.cyclePalette)
  const config = PALETTES[palette]

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={cycle}
            aria-label={`Theme · ${config.name}`}
            className="pointer-events-auto fixed top-6 right-20 h-10 pl-2 pr-3 rounded-full glass flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span
              className="w-6 h-6 rounded-full border border-white/20 shadow-inner"
              style={{ background: config.swatch }}
            />
            <PaletteIcon className="w-3.5 h-3.5 opacity-70" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
              {config.name}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          {config.description} — click to cycle
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
