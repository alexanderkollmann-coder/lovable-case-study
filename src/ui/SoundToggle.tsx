import { Volume2, VolumeX } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

export function SoundToggle() {
  const soundOn = useGameStore((s) => s.soundOn)
  const toggle = useGameStore((s) => s.toggleSound)
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={toggle}
            aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
            className="pointer-events-auto fixed top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">{soundOn ? 'Mute' : 'Sound off'}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
