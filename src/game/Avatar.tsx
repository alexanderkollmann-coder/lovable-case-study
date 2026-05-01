import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'
import { avatarGroupRef } from './refs'
import { WORLD_BOUNDS } from './World'
import { useGameStore } from '@/store/gameStore'
import { useKeyboard } from './controls/useKeyboard'
import boothMeta from '@/content/booths.config'
import type { BoothId } from '@/content/booths.config'

const SPEED = 6.4
const TURN_SPEED = 12

export function Avatar() {
  const groupRef = useRef<THREE.Group>(null)
  const keyState = useKeyboard()
  const facingY = useRef(Math.PI * 0.25)
  const bobPhase = useRef(0)
  const proximityRef = useRef<BoothId | null>(null)

  // expose group to module-scope ref so Camera can follow it
  useEffect(() => {
    avatarGroupRef.current = groupRef.current
    return () => {
      avatarGroupRef.current = null
    }
  }, [])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return

    const k = keyState.current
    const store = useGameStore.getState()

    // Pause all input while a booth panel is open, but keep gentle idle bob
    if (store.activeBoothId) {
      bobPhase.current += delta * 1.4
      g.position.y = Math.sin(bobPhase.current) * 0.025
      return
    }

    // 1) Compute movement vector
    const move = new THREE.Vector3(
      (k.right ? 1 : 0) - (k.left ? 1 : 0),
      0,
      (k.back ? 1 : 0) - (k.forward ? 1 : 0)
    )

    let usingTarget = false
    if (move.lengthSq() === 0 && store.avatarTarget) {
      const tx = store.avatarTarget[0]
      const tz = store.avatarTarget[2]
      const dx = tx - g.position.x
      const dz = tz - g.position.z
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist > 0.4) {
        move.set(dx / dist, 0, dz / dist)
        usingTarget = true
      } else {
        store.setAvatarTarget(null)
      }
    } else if (move.lengthSq() > 0) {
      // user took manual control — clear pending target
      if (store.avatarTarget) store.setAvatarTarget(null)
    }

    // 2) Apply movement
    if (move.lengthSq() > 0) {
      move.normalize()
      g.position.x += move.x * SPEED * delta
      g.position.z += move.z * SPEED * delta

      // Face direction of movement (camera-relative iso angle)
      const desired = Math.atan2(move.x, move.z)
      const diff = wrapPi(desired - facingY.current)
      facingY.current += diff * Math.min(1, TURN_SPEED * delta)
      g.rotation.y = facingY.current

      bobPhase.current += delta * 11
    } else {
      bobPhase.current += delta * 1.4
    }

    // Clamp to bounds
    g.position.x = Math.max(WORLD_BOUNDS.minX, Math.min(WORLD_BOUNDS.maxX, g.position.x))
    g.position.z = Math.max(WORLD_BOUNDS.minZ, Math.min(WORLD_BOUNDS.maxZ, g.position.z))

    // 3) Bob animation
    const bob = move.lengthSq() > 0 ? Math.abs(Math.sin(bobPhase.current)) * 0.07 : Math.sin(bobPhase.current) * 0.025
    g.position.y = bob

    // 4) Proximity check to booths in active timeline
    let nearest: { id: BoothId; dist: number } | null = null
    const activeBooths = boothMeta.filter((b) => b.timeline === store.timeline)
    for (const b of activeBooths) {
      const dx = b.position[0] - g.position.x
      const dz = b.position[2] - g.position.z
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < 2.6 && (nearest === null || dist < nearest.dist)) {
        nearest = { id: b.id, dist }
      }
    }
    const newProximityId: BoothId | null = nearest?.id ?? null
    if (newProximityId !== proximityRef.current) {
      proximityRef.current = newProximityId
      // dispatch via window event to avoid Zustand re-renders for a tight loop
      window.dispatchEvent(new CustomEvent('booth:proximity', { detail: newProximityId }))
    }

    // 5) Interaction
    if (k.interactPressedThisFrame) {
      k.interactPressedThisFrame = false
      if (newProximityId) {
        store.openBooth(newProximityId)
      }
    }

    // satisfy unused-locals when target tracking didn't engage
    void usingTarget
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, Math.PI * 0.25, 0]}>
      {/* Body */}
      <RoundedBox args={[0.7, 1.0, 0.5]} radius={0.18} smoothness={3} position={[0, 0.95, 0]} castShadow>
        <meshStandardMaterial color="#ff4d7a" roughness={0.55} />
      </RoundedBox>
      {/* Head */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.32, 24, 18]} />
        <meshStandardMaterial color="#fde0e7" roughness={0.55} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.11, 1.74, 0.27]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      <mesh position={[-0.11, 1.74, 0.27]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      {/* Hat (Lovable-pink) */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <coneGeometry args={[0.32, 0.45, 6]} />
        <meshStandardMaterial color="#ff4d7a" emissive="#ff4d7a" emissiveIntensity={0.18} roughness={0.45} />
      </mesh>
      {/* Hat tip */}
      <mesh position={[0, 2.28, 0]}>
        <sphereGeometry args={[0.06, 10, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.4} />
      </mesh>
      {/* Arms */}
      <RoundedBox args={[0.18, 0.55, 0.18]} radius={0.06} smoothness={2} position={[0.46, 0.95, 0]} castShadow>
        <meshStandardMaterial color="#fde0e7" />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.55, 0.18]} radius={0.06} smoothness={2} position={[-0.46, 0.95, 0]} castShadow>
        <meshStandardMaterial color="#fde0e7" />
      </RoundedBox>
      {/* Legs */}
      <RoundedBox args={[0.22, 0.45, 0.22]} radius={0.06} smoothness={2} position={[0.18, 0.32, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.45, 0.22]} radius={0.06} smoothness={2} position={[-0.18, 0.32, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Soft shadow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.6, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function wrapPi(a: number) {
  while (a > Math.PI) a -= Math.PI * 2
  while (a < -Math.PI) a += Math.PI * 2
  return a
}
