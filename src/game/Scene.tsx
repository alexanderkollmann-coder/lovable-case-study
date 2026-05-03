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
      <DisableCulling />
    </Suspense>
  )
}

function SkyAndFog({ fogColor }: { fogColor: THREE.Color }) {
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame((state, delta) => {
    const store = useGameStore.getState()
    const palette = PALETTES[store.palette]
    const inCinematic = store.cinematicShotId !== null

    tmp.set(palette.fog)
    fogColor.lerp(tmp, 1 - Math.exp(-3 * delta))

    // Background tracks the palette's background colour
    if (!(state.scene.background instanceof THREE.Color)) {
      state.scene.background = new THREE.Color()
    }
    ;(state.scene.background as THREE.Color).lerp(new THREE.Color(palette.background), 1 - Math.exp(-3 * delta))

    // Fog: disabled during cinematic shots so distant scenery never fades out as the camera moves.
    // Wider range (50 → 220) for regular gameplay so casual movement also doesn't fade scenery prematurely.
    if (inCinematic) {
      state.scene.fog = null
    } else {
      if (!state.scene.fog || !(state.scene.fog instanceof THREE.Fog)) {
        state.scene.fog = new THREE.Fog(fogColor, 50, 220)
      } else {
        const fog = state.scene.fog as THREE.Fog
        fog.color.copy(fogColor)
        fog.near = 50
        fog.far = 220
      }
    }
  })
  return null
}
