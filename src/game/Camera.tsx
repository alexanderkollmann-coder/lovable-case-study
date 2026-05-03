import { OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { avatarGroupRef } from './refs'
import { useGameStore } from '@/store/gameStore'

/**
 * Frontal / side-scroller camera.
 * - Camera sits in front of the action at fixed Y/Z, follows the avatar's X only.
 * - Looks toward the back of the world (z = 0) at a slight downward tilt.
 * - Avatar Z-movement reads as "depth into the stage", not as a camera-pan.
 *
 * Tuning knobs:
 *  CAMERA_HEIGHT — how high the camera sits above the floor.
 *  CAMERA_DISTANCE — how far in front of the world's z=0 line the camera stands.
 *  LOOK_HEIGHT — height the camera looks toward (slightly above avatar centre).
 *  ZOOM — orthographic zoom.
 */
const CAMERA_HEIGHT = 5
const CAMERA_DISTANCE = 16
const LOOK_HEIGHT = 1.6
const ZOOM = 60

export function Camera() {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const lookAtTarget = useRef(new THREE.Vector3(0, LOOK_HEIGHT, 0))

  useFrame((_, delta) => {
    if (!camRef.current) return

    // Yield to the cinematic shot player when a shot is playing
    if (useGameStore.getState().cinematicShotId) return

    const targetPos = avatarGroupRef.current?.position ?? new THREE.Vector3(0, 0, 0)

    // Camera follows avatar X only; height + Z-distance stay fixed.
    const desired = new THREE.Vector3(targetPos.x, CAMERA_HEIGHT, CAMERA_DISTANCE)
    const lambda = 5
    camRef.current.position.lerp(desired, 1 - Math.exp(-lambda * delta))

    // Snap zoom back to the gameplay default if it was changed by a cinematic shot
    if (Math.abs(camRef.current.zoom - ZOOM) > 0.5) {
      camRef.current.zoom = THREE.MathUtils.lerp(camRef.current.zoom, ZOOM, 1 - Math.exp(-3 * delta))
      camRef.current.updateProjectionMatrix()
    }

    // Always look at "stage centre" — avatar's X line, fixed depth at z=0.
    lookAtTarget.current.lerp(
      new THREE.Vector3(targetPos.x, LOOK_HEIGHT, 0),
      1 - Math.exp(-lambda * delta)
    )
    camRef.current.lookAt(lookAtTarget.current)
  })

  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      position={[0, CAMERA_HEIGHT, CAMERA_DISTANCE]}
      zoom={ZOOM}
      near={0.1}
      far={1000}
    />
  )
}
