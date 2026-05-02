import { RoundedBox, Image as DreiImage } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, type Timeline } from '@/store/gameStore'

/* -------------------------------------------------------------------------- */
/*  Zone activity helper — used by every prop to dim when the zone is inactive.  */
/* -------------------------------------------------------------------------- */

/**
 * Returns 1 when the given zone is the active timeline, lerping toward 0 when not.
 * Use inside `useFrame` to animate material colour, emissive, opacity, etc.
 */
export function useZoneActivity(zone: Timeline) {
  const ref = useRef(zone === useGameStore.getState().timeline ? 1 : 0)
  useFrame((_, delta) => {
    const target = useGameStore.getState().timeline === zone ? 1 : 0
    ref.current = THREE.MathUtils.lerp(ref.current, target, 1 - Math.exp(-3.5 * delta))
  })
  return ref
}

/* -------------------------------------------------------------------------- */
/*  Furniture & objects                                                        */
/* -------------------------------------------------------------------------- */

export function Desk({
  pos,
  rotation = 0,
  twin = false,
}: {
  pos: [number, number, number]
  rotation?: number
  twin?: boolean
}) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.6, 0.07, 0.85]} radius={0.04} smoothness={2} position={[0, 0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.55} />
      </RoundedBox>
      {[
        [-0.7, 0.35, -0.38],
        [0.7, 0.35, -0.38],
        [-0.7, 0.35, 0.38],
        [0.7, 0.35, 0.38],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#1f2332" />
        </mesh>
      ))}
      {twin ? (
        <>
          <Monitor pos={[-0.36, 1.06, -0.18]} />
          <Monitor pos={[0.36, 1.06, -0.18]} />
        </>
      ) : (
        <Monitor pos={[0, 1.06, -0.18]} />
      )}
      <Chair pos={[0, 0, 0.7]} />
    </group>
  )
}

export function Monitor({ pos, color = '#5e88ff' }: { pos: [number, number, number]; color?: string }) {
  return (
    <group position={pos}>
      <RoundedBox args={[0.7, 0.45, 0.04]} radius={0.02} smoothness={2} castShadow>
        <meshStandardMaterial color="#0a0d1a" emissive={color} emissiveIntensity={0.55} />
      </RoundedBox>
      <mesh position={[0, -0.27, 0.04]}>
        <boxGeometry args={[0.06, 0.1, 0.06]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <RoundedBox args={[0.18, 0.02, 0.12]} radius={0.01} smoothness={1} position={[0, -0.34, 0.04]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
    </group>
  )
}

export function Chair({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.5, 0.07, 0.5]} radius={0.04} smoothness={2} position={[0, 0.45, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.55, 0.05]} radius={0.04} smoothness={2} position={[0, 0.78, 0.25]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Chair stem */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#15171f" />
      </mesh>
      {/* Wheels */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.05, 5]} />
        <meshStandardMaterial color="#15171f" />
      </mesh>
    </group>
  )
}

export function Whiteboard({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.04} smoothness={2} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial color="#f7f4ec" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[2.5, 1.7, 0.06]} radius={0.04} smoothness={2} position={[0, 1.4, -0.04]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      <mesh position={[-0.9, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0.9, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

export function Plant({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.32, 0.4, 0.5, 12]} />
        <meshStandardMaterial color="#3a3036" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#2d6a52" roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0.2, 1.5, 0]} castShadow>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#34d399" roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

export function Bookshelf({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  const bookColors = ['#7aa1ff', '#ff4d7a', '#fbbf24', '#34d399', '#c084fc', '#f97316']
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.6, 2.2, 0.5]} radius={0.04} smoothness={2} position={[0, 1.1, 0]} castShadow>
        <meshStandardMaterial color="#3a2820" roughness={0.85} />
      </RoundedBox>
      {/* Books across 4 shelves */}
      {[0.4, 0.95, 1.5, 2.05].map((y, sIdx) => (
        <group key={sIdx} position={[0, y, 0]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[(-0.6 + i * 0.18), 0, 0.1]}>
              <boxGeometry args={[0.14, 0.32, 0.18]} />
              <meshStandardMaterial color={bookColors[(sIdx * 8 + i) % bookColors.length]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export function Banner({ pos, color, rotation = 0 }: { pos: [number, number, number]; color: string; rotation?: number }) {
  const meshRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6 + pos[0]) * 0.025
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 2.8, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <group ref={meshRef}>
        <RoundedBox args={[1.4, 1.8, 0.04]} radius={0.04} smoothness={2} position={[0, 1.85, 0]} castShadow>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </RoundedBox>
      </group>
    </group>
  )
}

export function ServerRack({ pos }: { pos: [number, number, number] }) {
  const ledRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ledRef.current) return
    ledRef.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial
      if (m && m.emissiveIntensity !== undefined) {
        const phase = state.clock.elapsedTime * 1.2 + i * 0.4 + pos[0]
        m.emissiveIntensity = 0.6 + (Math.sin(phase) * 0.5 + 0.5) * 1.4
      }
    })
  })
  return (
    <group position={pos}>
      <RoundedBox args={[1.0, 2.4, 0.9]} radius={0.06} smoothness={2} position={[0, 1.2, 0]} castShadow>
        <meshStandardMaterial color="#0f1320" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      <group ref={ledRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0.4 + i * 0.32, 0.46]}>
            <boxGeometry args={[0.6, 0.04, 0.02]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function Trophy({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[1.6, 0.3, 1.6]} radius={0.04} smoothness={2} position={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color="#262b3d" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.2, 1.2]} radius={0.04} smoothness={2} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color="#3a4360" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.05, 0.6, 12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} emissive="#fbbf24" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.25} emissive="#fbbf24" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.32, 1.1, 0]} castShadow>
        <torusGeometry args={[0.2, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[-0.32, 1.1, 0]} rotation={[0, Math.PI, 0]} castShadow>
        <torusGeometry args={[0.2, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  )
}

export function Riser({ pos, size = [2.4, 0.18, 1.6] }: { pos: [number, number, number]; size?: [number, number, number] }) {
  return (
    <RoundedBox args={size} radius={0.04} smoothness={2} position={[pos[0], size[1] / 2, pos[2]]} castShadow>
      <meshStandardMaterial color="#1a1f2e" roughness={0.85} />
    </RoundedBox>
  )
}

/* -------------------------------------------------------------------------- */
/*  Lovable-branded decoration                                                  */
/* -------------------------------------------------------------------------- */

export function LovablePoster({
  pos,
  rotation = 0,
  scale = 1.5,
}: {
  pos: [number, number, number]
  rotation?: number
  scale?: number
}) {
  const accentMat = useMemo(
    () => ({ color: '#0a0d1a', emissive: '#ff4d7a', emissiveIntensity: 0.18, roughness: 0.55 }),
    []
  )
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Frame */}
      <RoundedBox args={[scale * 1.2, scale * 0.5, 0.06]} radius={0.04} smoothness={2}>
        <meshStandardMaterial {...accentMat} />
      </RoundedBox>
      {/* Wordmark image, slightly forward */}
      <DreiImage
        url="/logos/lovable-wordmark-dark.png"
        position={[0, 0, 0.04]}
        scale={[scale * 1.18, scale * 0.42]}
        transparent
      />
    </group>
  )
}

export function LovableHeartFloating({
  pos,
  scale = 1,
  rotation = 0,
}: {
  pos: [number, number, number]
  scale?: number
  rotation?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = rotation + Math.sin(state.clock.elapsedTime * 0.4) * 0.18
    groupRef.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.12
  })
  return (
    <group ref={groupRef} position={pos}>
      <DreiImage url="/logos/lovable-heart.png" scale={[scale, scale]} transparent />
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Seated NPC for the command center                                          */
/* -------------------------------------------------------------------------- */

export function SeatedNPC({
  pos,
  rotation = 0,
  shirtColor = '#7aa1ff',
}: {
  pos: [number, number, number]
  rotation?: number
  shirtColor?: string
}) {
  const headRef = useRef<THREE.Mesh>(null)
  const armRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + pos[0]) * 0.18
    }
    if (armRef.current) {
      armRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 6 + pos[0]) * 0.18
    }
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <Chair pos={[0, 0, 0]} />
      {/* seated body — sit lower than walking avatar */}
      <RoundedBox args={[0.6, 0.7, 0.5]} radius={0.16} smoothness={3} position={[0, 0.85, 0]} castShadow>
        <meshStandardMaterial color={shirtColor} roughness={0.55} />
      </RoundedBox>
      <mesh ref={headRef} position={[0, 1.36, 0]} castShadow>
        <sphereGeometry args={[0.26, 18, 14]} />
        <meshStandardMaterial color="#fde0e7" roughness={0.55} />
      </mesh>
      {/* hair cap */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <sphereGeometry args={[0.27, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2332" roughness={0.85} />
      </mesh>
      {/* typing arm */}
      <RoundedBox ref={armRef} args={[0.16, 0.45, 0.16]} radius={0.05} smoothness={2} position={[0.32, 0.96, 0.22]}>
        <meshStandardMaterial color="#fde0e7" />
      </RoundedBox>
      <RoundedBox args={[0.16, 0.45, 0.16]} radius={0.05} smoothness={2} position={[-0.32, 0.96, 0.22]}>
        <meshStandardMaterial color="#fde0e7" />
      </RoundedBox>
    </group>
  )
}
