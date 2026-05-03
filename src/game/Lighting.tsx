import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS } from '@/store/gameStore'
import { damp } from '@/lib/utils'

export function Lighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const dirRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)

  const targetColor = useRef(new THREE.Color(TIMELINE_COLORS.hack.accent))

  useFrame((state, delta) => {
    const timeline = useGameStore.getState().timeline
    const palette = TIMELINE_COLORS[timeline]
    targetColor.current.set(palette.sky)

    if (ambientRef.current) {
      ambientRef.current.color.lerp(targetColor.current, 1 - Math.exp(-3 * delta))
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(new THREE.Color(palette.accent).lerp(new THREE.Color('#fff'), 0.5), 1 - Math.exp(-3 * delta))
    }
    if (fillRef.current) {
      fillRef.current.color.lerp(new THREE.Color(palette.fog), 1 - Math.exp(-3 * delta))
    }

    // gentle "breathing" dir intensity (lower base now — the per-zone spot lights carry the active zone)
    if (dirRef.current) {
      const t = state.clock.elapsedTime
      dirRef.current.intensity = damp(dirRef.current.intensity, 0.75 + Math.sin(t * 0.4) * 0.05, 4, delta)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.32} />
      <directionalLight
        ref={dirRef}
        position={[6, 22, 14]}
        intensity={0.75}
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
