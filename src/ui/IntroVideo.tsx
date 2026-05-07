import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { avatarGroupRef } from '@/game/refs'

/**
 * Fullscreen 16:9 intro video that sits on top of the 3D scene.
 *
 * Flow:
 *  - Tries to autoplay with sound. If the browser blocks it (most do unless the
 *    user has interacted with the site), we show a "Tap to begin" splash that
 *    starts playback on click.
 *  - When the video ends, the "Do you believe?" CTA fades in.
 *  - Clicking the CTA snaps the avatar to the pre-hackathon spawn, fades the
 *    video out, and the letterbox bars open to reveal the game.
 *  - Completion is persisted in sessionStorage so a hot-reload doesn't replay it.
 *    Append `?intro=1` to the URL to force replay; `?skipIntro` to skip it.
 *
 * Drop your video file at: public/video/intro.mp4
 */

const VIDEO_SRC = '/video/intro.mp4'
const PRE_ZONE_SPAWN: [number, number, number] = [-17, 0, 0]

export function IntroVideo() {
  const introComplete = useGameStore((s) => s.introComplete)
  const setIntroComplete = useGameStore((s) => s.setIntroComplete)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [needsTap, setNeedsTap] = useState(false)
  const [ended, setEnded] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  // Try to autoplay with sound; if blocked, fall back to "tap to begin"
  useEffect(() => {
    if (introComplete) return
    const v = videoRef.current
    if (!v) return
    v.muted = false
    const p = v.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => setNeedsTap(true))
    }
  }, [introComplete])

  if (introComplete && !exiting) return null

  const startWithSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.play().catch(() => {
      // last-resort: play muted so something happens
      v.muted = true
      v.play().catch(() => {})
    })
    setNeedsTap(false)
  }

  const handleEnter = () => {
    // Snap the avatar to the pre-hackathon zone spawn point
    const g = avatarGroupRef.current
    if (g) {
      g.position.set(PRE_ZONE_SPAWN[0], 0, PRE_ZONE_SPAWN[2])
    }
    useGameStore.getState().setAvatarTarget(PRE_ZONE_SPAWN)
    useGameStore.getState().setTimeline('pre')

    setExiting(true)
    // After fade + letterbox open, fully unmount
    setTimeout(() => {
      setIntroComplete(true)
      setExiting(false)
    }, 1400)
  }

  const handleStartTour = () => {
    // Kick off the b-roll sequence — TourPlayer takes over once intro unmounts.
    useGameStore.getState().setTourShotIndex(0)
    useGameStore.getState().setTourActive(true)

    setExiting(true)
    setTimeout(() => {
      setIntroComplete(true)
      setExiting(false)
    }, 1400)
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      style={{
        opacity: exiting ? 0 : 1,
        transition: 'opacity 1200ms ease-in-out',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* 16:9 video — letterboxed by black bars when viewport differs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-full"
          style={{
            aspectRatio: '16 / 9',
            maxHeight: exiting ? '0vh' : '100vh',
            transition: 'max-height 1200ms cubic-bezier(0.7, 0, 0.3, 1)',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            preload="auto"
            onEnded={() => setEnded(true)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget
              if (v.duration && v.duration - v.currentTime < 1) {
                setFadingOut(true)
              }
            }}
            className="w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: fadingOut ? 0 : 1 }}
          />

          {/* "Tap to begin" splash if browser blocked autoplay-with-sound */}
          {needsTap && !ended && (
            <button
              type="button"
              onClick={startWithSound}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-3">
                Sound on
              </div>
              <div className="text-2xl font-light tracking-wide">
                Tap to begin
              </div>
            </button>
          )}

          {/* Subtle skip button — bottom-right, persists after the video ends */}
          <button
            type="button"
            onClick={handleEnter}
            className="absolute bottom-5 right-6 text-[10px] uppercase tracking-[0.32em] text-white/40 hover:text-white/90 transition-colors z-10"
          >
            Skip <span className="ml-1">→</span>
          </button>

          {/* "Take a tour" CTA — fades in when the video ends */}
          {ended && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)',
                animation: 'fadeIn 600ms ease-out forwards',
              }}
            >
              <button
                type="button"
                onClick={handleStartTour}
                className="group relative px-10 py-5 rounded-full bg-white/95 text-black text-lg font-medium tracking-wide hover:bg-white transition-all hover:scale-105 shadow-2xl"
                style={{ animation: 'fadeInUp 800ms ease-out 200ms both' }}
              >
                Take a tour
                <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
