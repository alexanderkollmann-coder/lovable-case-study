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
import { DisableCulling } from './DisableCulling'

export function Scene() {
  const renderPaused = useGameStore((s) => s.renderPaused)
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop={renderPaused ? 'never' : 'always'}
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
      <DisableCulling />
    </Suspense>
  )
}

function SkyAndFog({ fogColor: _ }: { fogColor: THREE.Color }) {
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame((state, delta) => {
    const store = useGameStore.getState()
    const palette = PALETTES[store.palette]
    const inCinematic = store.cinematicShotId !== null

    // Background tracks the palette's background colour
    if (!(state.scene.background instanceof THREE.Color)) {
      state.scene.background = new THREE.Color()
    }
    tmp.set(palette.background)
    if (inCinematic) {
      ;(state.scene.background as THREE.Color).copy(tmp)
    } else {
      ;(state.scene.background as THREE.Color).lerp(tmp, 1 - Math.exp(-3 * delta))
    }

    // Fog removed entirely — was causing distant scenery to fade in/out as camera moved
    state.scene.fog = null
  })
  return null
}
