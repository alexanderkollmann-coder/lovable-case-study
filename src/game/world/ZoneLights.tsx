import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS, type Timeline } from '@/store/gameStore'

const ZONE_CENTERS: Record<Timeline, [number, number]> = {
  pre: [-17, 0],
  hack: [0, 0],
  post: [17, 0],
}

/**
 * One bright key light per zone. Intensity smoothly lerps to ~3 when the zone is active,
 * collapses to ~0.05 when not. Combined with the ambient lerp in `Lighting.tsx`, this
 * produces the "active zone springs to life, inactive zones go dark" feel the user asked for.
 */
export function ZoneLights() {
  return (
    <>
      <ZoneKeyLight zone="pre" />
      <ZoneKeyLight zone="hack" />
      <ZoneKeyLight zone="post" />
    </>
  )
}

function ZoneKeyLight({ zone }: { zone: Timeline }) {
  const lightRef = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D())
  const intensityRef = useRef(zone === useGameStore.getState().timeline ? 3 : 0.05)

  const center = ZONE_CENTERS[zone]
  const palette = TIMELINE_COLORS[zone]

  useFrame((_, delta) => {
    const active = useGameStore.getState().timeline === zone
    const target = active ? 3.2 : 0.05
    intensityRef.current = THREE.MathUtils.lerp(intensityRef.current, target, 1 - Math.exp(-3.5 * delta))
    if (lightRef.current) {
      lightRef.current.intensity = intensityRef.current
      // also slightly bias the colour temperature (cooler when off)
      const c = new THREE.Color(palette.accent)
      lightRef.current.color.lerp(c, 1 - Math.exp(-2 * delta))
    }
    if (targetRef.current) {
      targetRef.current.position.set(center[0], 0, center[1])
      targetRef.current.updateMatrixWorld()
      if (lightRef.current) lightRef.current.target = targetRef.current
    }
  })

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[center[0], 18, center[1] + 4]}
        color={palette.accent}
        angle={0.55}
        penumbra={0.5}
        distance={36}
        decay={1.2}
      />
      <primitive object={targetRef.current} />
    </>
  )
}
