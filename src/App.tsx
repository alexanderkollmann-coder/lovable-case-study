import { useEffect, useState } from 'react'
import { Scene } from '@/game/Scene'
import { Hud } from '@/ui/Hud'
import { TimelineSlider } from '@/ui/TimelineSlider'
import { BoothPanel } from '@/ui/BoothPanel'
import { SoundToggle } from '@/ui/SoundToggle'
import { LoadingSplash } from '@/ui/LoadingSplash'
import { Hint } from '@/ui/Hint'
import { Footer } from '@/ui/Footer'
import { BrandLockup } from '@/ui/BrandLockup'
import { ProgressTracker } from '@/ui/ProgressTracker'
import { BoothAudio } from '@/ui/BoothAudio'
import { ThemeToggle } from '@/ui/ThemeToggle'
import { RenderPauseToggle } from '@/ui/RenderPauseToggle'
import { IntroVideo } from '@/ui/IntroVideo'
import { Cinematic } from '@/cinematic/Cinematic'
import { CinematicDebugHud } from '@/cinematic/CinematicDebugHud'
import { useGameStore } from '@/store/gameStore'

function App() {
  const [loading, setLoading] = useState(true)
  const [cinematicMode, setCinematicMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).has('cinematic')
  })
  const cinematicShotId = useGameStore((s) => s.cinematicShotId)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  // Hide all gameplay UI while a shot is playing (recording or previewing)
  const hideGameplayUI = cinematicShotId !== null

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Vignette overlay for cinematic feel */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* HUD layer — hidden during cinematic shots so it doesn't appear in recordings */}
      {!hideGameplayUI && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {!cinematicMode && (
            <>
              <BrandLockup />
              <Hud />
              <SoundToggle />
              <ThemeToggle />
              <Hint />
              <ProgressTracker />
              <TimelineSlider />
              <Footer />
            </>
          )}
        </div>
      )}

      {/* Booth panel (interactive only — never visible during cinematic) */}
      {!cinematicMode && !hideGameplayUI && <BoothPanel />}

      {/* Audio (proximity-triggered) — disabled in cinematic mode to keep recordings clean */}
      {!cinematicMode && <BoothAudio />}

      {/* Cinematic recording panel */}
      {cinematicMode && (
        <Cinematic
          onExit={() => {
            const url = new URL(window.location.href)
            url.searchParams.delete('cinematic')
            window.history.replaceState({}, '', url.toString())
            setCinematicMode(false)
          }}
        />
      )}

      {/* Cinematic debug HUD — only when a shot is active */}
      {cinematicMode && <CinematicDebugHud />}

      {/* Loading splash */}
      <LoadingSplash visible={loading} />

      {/* Tiny render-pause toggle (bottom-right) — keeps laptop cool while idle */}
      {!cinematicMode && <RenderPauseToggle />}

      {/* Intro video — sits on top of the scene until user clicks "Do you believe?" */}
      {!cinematicMode && <IntroVideo />}
    </div>
  )
}

export default App
