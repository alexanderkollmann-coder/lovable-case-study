import { OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { avatarGroupRef } from './refs'

const OFFSET = new THREE.Vector3(18, 22, 18)

export function Camera() {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const lookAtTarget = useRef(new THREE.Vector3(0, 0.6, 0))

  useFrame((_, delta) => {
    if (!camRef.current) return

    const targetPos = avatarGroupRef.current?.position ?? new THREE.Vector3(0, 0, 0)

    const desired = new THREE.Vector3().copy(targetPos).add(OFFSET)
    const lambda = 4
    camRef.current.position.lerp(desired, 1 - Math.exp(-lambda * delta))

    lookAtTarget.current.lerp(
      new THREE.Vector3(targetPos.x, targetPos.y + 0.6, targetPos.z),
      1 - Math.exp(-lambda * delta)
    )
    camRef.current.lookAt(lookAtTarget.current)
  })

  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      position={[18, 22, 18]}
      zoom={48}
      near={0.1}
      far={200}
    />
  )
}
