import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'
import { SHOTS, sampleShot } from './shots'

/**
 * Lives inside the R3F <Canvas>. Reads the current shot id, t, and autoAdvance flag from the store.
 * If autoAdvance is true, t advances each frame by `delta / shot.duration`. If false, t is held
 * (so the user can scrub via the debug HUD).
 *
 * Priority -10 so the camera is positioned BEFORE every other useFrame in the scene. Otherwise
 * materials/lights that read camera state have a one-frame lag, which can read as items "fading in"
 * at distance thresholds.
 */
export function ShotPlayer() {
  const camera = useThree((s) => s.camera)

  // When the active shot changes, snap the timeline AND reset t to 0
  useEffect(() => {
    return useGameStore.subscribe((s, prev) => {
      if (s.cinematicShotId !== prev.cinematicShotId) {
        if (s.cinematicShotId) {
          const shot = SHOTS.find((sh) => sh.id === s.cinematicShotId)
          if (shot) {
            useGameStore.getState().setTimeline(shot.timeline)
          }
        }
      }
    })
  }, [])

  useFrame((_, delta) => {
    const store = useGameStore.getState()
    const id = store.cinematicShotId
    if (!id) return
    const shot = SHOTS.find((s) => s.id === id)
    if (!shot) return

    const currentT = store.cinematicShotT
    let t = currentT
    if (store.cinematicAutoAdvance && currentT < 1) {
      t = Math.min(1, currentT + delta / shot.duration)
      store.setCinematicShotT(t)
    }

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
