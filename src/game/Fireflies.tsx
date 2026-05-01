import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS } from '@/store/gameStore'

const COUNT = 80

/**
 * Soft drifting glow particles. Density highlights the active timeline zone.
 */
export function Fireflies() {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.PointsMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 60
      arr[i * 3 + 1] = Math.random() * 5 + 0.6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 28
    }
    return arr
  }, [])

  const seeds = useMemo(() => {
    const s = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      s[i * 3 + 0] = Math.random() * Math.PI * 2
      s[i * 3 + 1] = Math.random() * Math.PI * 2
      s[i * 3 + 2] = Math.random() * Math.PI * 2
    }
    return s
  }, [])

  useFrame((state, delta) => {
    const points = pointsRef.current
    const mat = matRef.current
    if (!points || !mat) return

    const t = state.clock.elapsedTime
    const positionsAttr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    const data = positionsAttr.array as Float32Array

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const sx = seeds[ix]
      const sy = seeds[ix + 1]
      const sz = seeds[ix + 2]
      data[ix] += Math.sin(t * 0.4 + sx) * delta * 0.18
      data[ix + 1] += Math.sin(t * 0.6 + sy) * delta * 0.08
      data[ix + 2] += Math.cos(t * 0.5 + sz) * delta * 0.18
    }
    positionsAttr.needsUpdate = true

    // colour shift
    const palette = TIMELINE_COLORS[useGameStore.getState().timeline]
    targetColor.set(palette.accent)
    mat.color.lerp(targetColor, 1 - Math.exp(-2 * delta))
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.18}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
