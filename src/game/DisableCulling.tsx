import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'

/**
 * Walks the scene and sets `frustumCulled = false` on every Object3D so nothing
 * pops in/out of frame during cinematic shots — the cinematic camera moves to
 * angles the gameplay camera never reaches, which can leave background skyline
 * elements outside their default frustum bounds.
 *
 * Re-runs on cinematic shot changes (which mount/unmount the ShotPlayer effects)
 * and once on mount as a safety net for the initial scene tree.
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
    // Apply again next tick to catch any objects mounted after this effect runs.
    const t = setTimeout(apply, 30)
    return () => clearTimeout(t)
  }, [scene, cinematicShotId, timeline])

  return null
}
