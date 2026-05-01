import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS } from '@/store/gameStore'
import { Camera } from './Camera'
import { Lighting } from './Lighting'
import { World } from './World'
import { Avatar } from './Avatar'
import { Booths } from './Booths'
import { CloudSweep } from './CloudSweep'
import { Fireflies } from './Fireflies'
import { useFrame } from '@react-three/fiber'

export function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <SceneContents />
    </Canvas>
  )
}

function SceneContents() {
  const setTarget = useGameStore((s) => s.setAvatarTarget)
  const fogColor = useMemo(() => new THREE.Color(), [])

  return (
    <Suspense fallback={null}>
      <SkyAndFog fogColor={fogColor} />
      <Camera />
      <Lighting />
      <World onGroundClick={(p) => setTarget([p.x, 0, p.z])} />
      <Booths />
      <Avatar />
      <Fireflies />
      <CloudSweep />
    </Suspense>
  )
}

function SkyAndFog({ fogColor }: { fogColor: THREE.Color }) {
  useFrame((state, delta) => {
    const timeline = useGameStore.getState().timeline
    const palette = TIMELINE_COLORS[timeline]
    fogColor.lerp(new THREE.Color(palette.fog), 1 - Math.exp(-3 * delta))
    state.scene.background = fogColor
    if (!state.scene.fog) {
      state.scene.fog = new THREE.Fog(fogColor, 32, 80)
    } else {
      ;(state.scene.fog as THREE.Fog).color.copy(fogColor)
    }
  })
  return null
}
