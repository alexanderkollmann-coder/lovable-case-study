import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useGameStore, PALETTES } from '@/store/gameStore'
import { Camera } from './Camera'
import { Lighting } from './Lighting'
import { World } from './World'
import { Avatar } from './Avatar'
import { Booths } from './Booths'
import { CloudSweep } from './CloudSweep'
import { Fireflies } from './Fireflies'
import { useFrame } from '@react-three/fiber'
import { ShotPlayer } from '@/cinematic/ShotPlayer'

export function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      // `preserveDrawingBuffer` is required for `canvas.captureStream()` recording in cinematic mode
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
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
      <ShotPlayer />
    </Suspense>
  )
}

function SkyAndFog({ fogColor }: { fogColor: THREE.Color }) {
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame((state, delta) => {
    const palette = PALETTES[useGameStore.getState().palette]
    tmp.set(palette.fog)
    fogColor.lerp(tmp, 1 - Math.exp(-3 * delta))
    // Background uses the palette's "background" colour (often slightly different from fog)
    if (!(state.scene.background instanceof THREE.Color)) {
      state.scene.background = new THREE.Color()
    }
    ;(state.scene.background as THREE.Color).lerp(new THREE.Color(palette.background), 1 - Math.exp(-3 * delta))
    if (!state.scene.fog) {
      state.scene.fog = new THREE.Fog(fogColor, 32, 80)
    } else {
      ;(state.scene.fog as THREE.Fog).color.copy(fogColor)
    }
  })
  return null
}
