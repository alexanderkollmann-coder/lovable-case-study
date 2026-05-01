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

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

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

      {/* HUD layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <BrandLockup />
        <Hud />
        <SoundToggle />
        <Hint />
        <ProgressTracker />
        <TimelineSlider />
        <Footer />
      </div>

      {/* Booth panel */}
      <BoothPanel />

      {/* Loading splash */}
      <LoadingSplash visible={loading} />
    </div>
  )
}

export default App
