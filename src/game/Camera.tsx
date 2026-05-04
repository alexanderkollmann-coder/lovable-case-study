import { OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { avatarGroupRef } from './refs'
import { useGameStore } from '@/store/gameStore'

/**
 * Gameplay camera. Avatar is the anchor; camera position + lookAt are derived
 * from the avatar's position plus an offset/lookOffset stored in `gameStore.cameraConfig`.
 *
 * The Camera Explorer panel (mounted in `?cinematic=1`) lets you live-tune that config
 * to find the framing you want for the demo, then copy the values into the store
 * default to ship them.
 *
 * `followX` / `followZ` toggle whether each axis tracks the avatar (off = use the
 * offset's coord as an absolute world position — gives the side-scroller feel).
 */
export function Camera() {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const lookAtTarget = useRef(new THREE.Vector3(0, 1.6, 0))

  useFrame((_, delta) => {
    if (!camRef.current) return

    // Yield to the cinematic shot player when a shot is playing
    const store = useGameStore.getState()
    if (store.cinematicShotId) return

    const cfg = store.cameraConfig
    const targetPos = avatarGroupRef.current?.position ?? new THREE.Vector3(0, 0, 0)

    const desiredX = cfg.followX ? targetPos.x + cfg.offset[0] : cfg.offset[0]
    const desiredY = cfg.offset[1]
    const desiredZ = cfg.followZ ? targetPos.z + cfg.offset[2] : cfg.offset[2]
    const desired = new THREE.Vector3(desiredX, desiredY, desiredZ)

    const lambda = 5
    camRef.current.position.lerp(desired, 1 - Math.exp(-lambda * delta))

    // Live-track zoom toward the configured value.
    if (Math.abs(camRef.current.zoom - cfg.zoom) > 0.05) {
      camRef.current.zoom = THREE.MathUtils.lerp(camRef.current.zoom, cfg.zoom, 1 - Math.exp(-4 * delta))
      camRef.current.updateProjectionMatrix()
    }

    // LookAt MIRRORS the same follow-axis rules as the camera position. If `followZ` is off,
    // walking the avatar forward/back must NOT pan the look target — otherwise the camera tilts
    // every time you tap an arrow key. Keeping the rules in sync means the avatar stays pinned
    // in the frame at the exact same screen position regardless of where they walk.
    const lookX = cfg.followX ? targetPos.x + cfg.lookOffset[0] : cfg.lookOffset[0]
    const lookY = cfg.lookOffset[1]
    const lookZ = cfg.followZ ? targetPos.z + cfg.lookOffset[2] : cfg.lookOffset[2]
    const lookDesired = new THREE.Vector3(lookX, lookY, lookZ)
    lookAtTarget.current.lerp(lookDesired, 1 - Math.exp(-lambda * delta))
    camRef.current.lookAt(lookAtTarget.current)
  })

  const initial = useGameStore.getState().cameraConfig
  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      position={[initial.offset[0], initial.offset[1], initial.offset[2]]}
      zoom={initial.zoom}
      near={-500}
      far={1000}
    />
  )
}
