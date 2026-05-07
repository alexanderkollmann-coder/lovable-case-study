import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import { SHOTS, TOUR_SHOT_IDS } from './shots'
import { avatarGroupRef } from '@/game/refs'

/**
 * Plays the 5-shot post-intro b-roll. When `tourActive` flips true, walks through
 * TOUR_SHOT_IDS in order, setting `cinematicShotId` for each shot and using a
 * setTimeout sized to the shot's duration to advance. After the last shot, snaps
 * the avatar to the pre-zone spawn and clears the cinematic state so gameplay
 * picks up cleanly.
 *
 * Hides gameplay UI for free, because App.tsx already gates `hideGameplayUI` on
 * `cinematicShotId !== null`.
 */
export function TourPlayer() {
  const tourActive = useGameStore((s) => s.tourActive)
  const tourShotIndex = useGameStore((s) => s.tourShotIndex)

  useEffect(() => {
    if (!tourActive) return
    const shotId = TOUR_SHOT_IDS[tourShotIndex]
    const shot = SHOTS.find((s) => s.id === shotId)
    if (!shot) return

    // Kick off this shot
    const store = useGameStore.getState()
    store.setTimeline(shot.timeline)
    store.setCinematicShotT(0)
    store.setCinematicAutoAdvance(true)
    store.setCinematicShotId(shot.id)

    const t = setTimeout(() => {
      const isLast = tourShotIndex >= TOUR_SHOT_IDS.length - 1
      if (!isLast) {
        useGameStore.getState().setTourShotIndex(tourShotIndex + 1)
      } else {
        // End of tour — release control to gameplay
        const g = avatarGroupRef.current
        if (g) g.position.set(-17, 0, 0)
        useGameStore.getState().setAvatarTarget([-17, 0, 0])
        useGameStore.getState().setTimeline('pre')
        useGameStore.getState().setCinematicShotId(null)
        useGameStore.getState().setTourShotIndex(0)
        useGameStore.getState().setTourActive(false)
      }
    }, shot.duration * 1000)

    return () => clearTimeout(t)
  }, [tourActive, tourShotIndex])

  return null
}
