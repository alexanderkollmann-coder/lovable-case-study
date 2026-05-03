import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, PALETTES } from '@/store/gameStore'
import { damp } from '@/lib/utils'

/**
 * Global lighting. Drives ambient + directional + fill from the active palette.
 * Per-zone accent colour shifts come from the spotlights in `ZoneLights.tsx`,
 * not from the global ambient — so palette can stay consistent across timelines.
 */
export function Lighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const dirRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)

  const ambientTarget = useRef(new THREE.Color(PALETTES.cinematic.ambientColor))
  const dirTarget = useRef(new THREE.Color(PALETTES.cinematic.directionalColor))
  const fillTarget = useRef(new THREE.Color(PALETTES.cinematic.fog))

  useFrame((state, delta) => {
    const palette = PALETTES[useGameStore.getState().palette]
    ambientTarget.current.set(palette.ambientColor)
    dirTarget.current.set(palette.directionalColor)
    fillTarget.current.set(palette.fog)

    const lerpRate = 1 - Math.exp(-3 * delta)
    if (ambientRef.current) {
      ambientRef.current.color.lerp(ambientTarget.current, lerpRate)
      ambientRef.current.intensity = damp(ambientRef.current.intensity, palette.ambientIntensity, 4, delta)
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(dirTarget.current, lerpRate)
      const t = state.clock.elapsedTime
      const target = palette.directionalIntensity + Math.sin(t * 0.4) * 0.05
      dirRef.current.intensity = damp(dirRef.current.intensity, target, 4, delta)
    }
    if (fillRef.current) {
      fillRef.current.color.lerp(fillTarget.current, lerpRate)
    }
  })

  const initial = PALETTES.cinematic
  return (
    <>
      <ambientLight ref={ambientRef} intensity={initial.ambientIntensity} />
      <directionalLight
        ref={dirRef}
        position={[6, 22, 14]}
        intensity={initial.directionalIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-near={0.1}
        shadow-camera-far={80}
      />
      <directionalLight ref={fillRef} position={[-6, 10, 14]} intensity={0.25} />
    </>
  )
}
