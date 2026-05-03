import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'
import { SHOTS, sampleShot } from './shots'

/**
 * Lives inside the R3F <Canvas>. When the store's `cinematicShotId` is set,
 * it animates the active orthographic camera along the shot's keyframes for the shot's duration.
 *
 * Parent (`Cinematic.tsx`) is responsible for clearing `cinematicShotId` when the shot ends —
 * it knows how long to wait because it's also driving the recorder.
 */
export function ShotPlayer() {
  const camera = useThree((s) => s.camera)
  const startTime = useRef<number | null>(null)
  const activeId = useRef<string | null>(null)

  // Reset the start clock whenever the active shot changes
  useEffect(() => {
    return useGameStore.subscribe((s, prev) => {
      if (s.cinematicShotId !== prev.cinematicShotId) {
        startTime.current = null
        activeId.current = s.cinematicShotId
        // Snap timeline to the shot's required state immediately
        if (s.cinematicShotId) {
          const shot = SHOTS.find((sh) => sh.id === s.cinematicShotId)
          if (shot) {
            useGameStore.getState().setTimeline(shot.timeline)
          }
        }
      }
    })
  }, [])

  // Priority -10 so the camera is positioned BEFORE every other useFrame in the scene.
  // Otherwise materials/lights that read camera state have a one-frame lag, which can
  // read as items "fading in" at distance thresholds.
  useFrame(() => {
    const id = useGameStore.getState().cinematicShotId
    if (!id) {
      startTime.current = null
      return
    }
    const shot = SHOTS.find((s) => s.id === id)
    if (!shot) return

    if (startTime.current === null) startTime.current = performance.now()
    const elapsed = (performance.now() - startTime.current) / 1000
    const t = Math.min(1, elapsed / shot.duration)

    const { pos, lookAt, zoom } = sampleShot(shot, t)
    camera.position.set(pos[0], pos[1], pos[2])
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = zoom
    }
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2])
    camera.updateMatrixWorld(true)
    camera.updateProjectionMatrix()
  }, -10)

  return null
}
