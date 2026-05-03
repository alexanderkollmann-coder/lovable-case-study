import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'

/**
 * Walks the scene and sets `frustumCulled = false` on every Object3D so nothing
 * pops in/out of frame during cinematic shots. Belt + braces:
 *   1. Effect on mount + on cinematic/timeline change applies once + after a 30ms tick
 *   2. While a cinematic shot is active, re-applies every frame as a safety net for
 *      late-mounted meshes (e.g. drei components that hydrate inside Suspense).
 */
export function DisableCulling() {
  const scene = useThree((s) => s.scene)
  const cinematicShotId = useGameStore((s) => s.cinematicShotId)
  const timeline = useGameStore((s) => s.timeline)

  useEffect(() => {
    const apply = () => {
      scene.traverse((obj) => {
        obj.frustumCulled = false
      })
    }
    apply()
    const t = setTimeout(apply, 30)
    return () => clearTimeout(t)
  }, [scene, cinematicShotId, timeline])

  useFrame(() => {
    if (useGameStore.getState().cinematicShotId === null) return
    scene.traverse((obj) => {
      if (obj.frustumCulled) obj.frustumCulled = false
    })
  })

  return null
}
