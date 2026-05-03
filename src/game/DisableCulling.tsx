import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'

/**
 * Forces total visibility consistency during cinematic shots:
 *
 *  1. `frustumCulled = false` on every Object3D — nothing gets clipped at frustum edges
 *     when the cinematic camera moves to angles the gameplay camera never reaches.
 *
 *  2. `material.fog = false` on every material — `MeshStandardMaterial` defaults to
 *     `fog = true`, which means the fog code is baked into the compiled shader even
 *     after we set `scene.fog = null`. Forcing `material.fog = false` and triggering
 *     `needsUpdate` recompiles the shader without fog code, so distant scenery never
 *     fades to the fog colour mid-shot.
 */
export function DisableCulling() {
  const scene = useThree((s) => s.scene)
  const cinematicShotId = useGameStore((s) => s.cinematicShotId)
  const timeline = useGameStore((s) => s.timeline)

  useEffect(() => {
    const inCinematic = cinematicShotId !== null
    const apply = () => {
      scene.traverse((obj) => {
        obj.frustumCulled = false
        const mesh = obj as THREE.Mesh
        if (!mesh.material) return
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        for (const m of materials) {
          if (!m || typeof m !== 'object') continue
          // Every standard/physical/basic/etc. material has a `fog` property.
          if ('fog' in m) {
            const desired = !inCinematic
            // `fog` is a boolean. Force the shader to recompile only when the value flips.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mat = m as any
            if (mat.fog !== desired) {
              mat.fog = desired
              mat.needsUpdate = true
            }
          }
        }
      })
    }
    apply()
    const t = setTimeout(apply, 30)
    return () => clearTimeout(t)
  }, [scene, cinematicShotId, timeline])

  // Safety net while cinematic is active — re-apply flags every frame for any
  // mesh that mounted after the effect ran (e.g. drei components hydrating inside Suspense).
  useFrame(() => {
    if (useGameStore.getState().cinematicShotId === null) return
    scene.traverse((obj) => {
      if (obj.frustumCulled) obj.frustumCulled = false
      const mesh = obj as THREE.Mesh
      if (!mesh.material) return
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      for (const m of materials) {
        if (!m || typeof m !== 'object') continue
        if ('fog' in m) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mat = m as any
          if (mat.fog !== false) {
            mat.fog = false
            mat.needsUpdate = true
          }
        }
      }
    })
  })

  return null
}
