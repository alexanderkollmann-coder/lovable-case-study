import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import type { BoothId } from '@/content/booths.config'

const TRIGGER_BOOTH: BoothId = 'measurement'
const TRACK_SRC = '/audio/in-the-house.mp3'

/**
 * Plays "In The House" when the avatar is within proximity of the Measurement booth.
 *
 * Behaviour:
 *  - Enter proximity zone   → play from the start (if sound is on)
 *  - Toggle sound off       → pause (position preserved)
 *  - Toggle sound on (still nearby) → resume
 *  - Leave proximity zone   → pause + reset to 0
 */
export function BoothAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [inProximity, setInProximity] = useState(false)
  const soundOn = useGameStore((s) => s.soundOn)

  // Track proximity to the trigger booth via the window event Avatar dispatches
  useEffect(() => {
    const handleProximity = (e: Event) => {
      const id = (e as CustomEvent<BoothId | null>).detail
      const next = id === TRIGGER_BOOTH
      setInProximity((prev) => {
        if (prev === next) return prev
        return next
      })
    }
    window.addEventListener('booth:proximity', handleProximity)
    return () => window.removeEventListener('booth:proximity', handleProximity)
  }, [])

  // React to proximity transitions
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (inProximity) {
      // Restart from beginning every time the avatar enters the zone
      audio.currentTime = 0
      if (soundOn) {
        audio.play().catch(() => {
          /* autoplay can be denied if the user hasn't interacted yet — ignore */
        })
      }
    } else {
      audio.pause()
      audio.currentTime = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProximity])

  // React to sound toggle while in proximity (mute/unmute without restarting)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!inProximity) return

    if (soundOn) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [soundOn, inProximity])

  return (
    <audio
      ref={audioRef}
      src={TRACK_SRC}
      preload="auto"
      // ensures we cleanly stop at end and let it restart on next entry
      onEnded={(e) => {
        const a = e.currentTarget
        a.currentTime = 0
      }}
    />
  )
}
