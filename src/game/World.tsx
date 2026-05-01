import { RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS } from '@/store/gameStore'
import type { Timeline } from '@/store/gameStore'

interface ZoneSpec {
  timeline: Timeline
  center: [number, number]
  size: [number, number]
  label: string
}

const ZONES: ZoneSpec[] = [
  { timeline: 'pre', center: [-17, 0], size: [16, 22], label: 'PRE-HACKATHON · LONDON OFFICE' },
  { timeline: 'hack', center: [0, 0], size: [16, 22], label: 'HACKATHON · GAME DAY' },
  { timeline: 'post', center: [17, 0], size: [16, 22], label: 'POST-HACKATHON · DEPLOYMENT' },
]

const MAP_HALF_X = 28
const MAP_HALF_Z = 14
export const WORLD_BOUNDS = { minX: -MAP_HALF_X + 1, maxX: MAP_HALF_X - 1, minZ: -MAP_HALF_Z + 1, maxZ: MAP_HALF_Z - 1 }

export function World({ onGroundClick }: { onGroundClick: (point: THREE.Vector3) => void }) {
  return (
    <group>
      {/* Base ground (master plane, used for click-to-walk raycasts) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (e.button !== 0) return
          e.stopPropagation()
          onGroundClick(e.point.clone())
        }}
      >
        <planeGeometry args={[MAP_HALF_X * 2, MAP_HALF_Z * 2, 1, 1]} />
        <meshStandardMaterial color="#1a1f2e" roughness={1} metalness={0} />
      </mesh>

      {/* Zone tiles */}
      {ZONES.map((zone) => (
        <Zone key={zone.timeline} {...zone} />
      ))}

      {/* Decorative perimeter walls / planters */}
      <Perimeter />

      {/* Pre-hackathon props */}
      <PreHackathonScenery />
      {/* Hackathon props */}
      <HackathonScenery />
      {/* Post-hackathon props */}
      <PostHackathonScenery />
    </group>
  )
}

function Zone({ timeline, center, size, label }: ZoneSpec) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const baseColor = useMemo(() => new THREE.Color(TIMELINE_COLORS[timeline].ground), [timeline])

  useFrame((_, delta) => {
    const active = useGameStore.getState().timeline === timeline
    if (!matRef.current) return
    targetColor.copy(baseColor)
    if (!active) targetColor.lerp(new THREE.Color('#1a1f2e'), 0.55)
    matRef.current.color.lerp(targetColor, 1 - Math.exp(-3 * delta))
    const desiredOpacity = active ? 1 : 0.55
    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, desiredOpacity, 1 - Math.exp(-3 * delta))
  })

  return (
    <group position={[center[0], 0.001, center[1]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size[0], size[1], 1, 1]} />
        <meshStandardMaterial ref={matRef} color={baseColor} roughness={0.95} metalness={0} transparent />
      </mesh>
      {/* Subtle border ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[Math.min(size[0], size[1]) / 2 - 0.4, Math.min(size[0], size[1]) / 2 - 0.2, 64]} />
        <meshBasicMaterial color={TIMELINE_COLORS[timeline].accent} transparent opacity={0.18} />
      </mesh>
      {/* Floor label */}
      <Text
        position={[0, 0.02, -size[1] / 2 + 1.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.55}
        color={TIMELINE_COLORS[timeline].accent}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        outlineWidth={0}
      >
        {label}
      </Text>
    </group>
  )
}

function Perimeter() {
  const segments: Array<[number, number, number, number]> = [
    [0, MAP_HALF_Z + 0.4, MAP_HALF_X * 2, 0.6],
    [0, -MAP_HALF_Z - 0.4, MAP_HALF_X * 2, 0.6],
    [-MAP_HALF_X - 0.4, 0, 0.6, MAP_HALF_Z * 2 + 1.2],
    [MAP_HALF_X + 0.4, 0, 0.6, MAP_HALF_Z * 2 + 1.2],
  ]
  return (
    <group>
      {segments.map(([x, z, w, d], i) => (
        <RoundedBox key={i} args={[w, 0.4, d]} radius={0.1} position={[x, 0.2, z]} smoothness={2}>
          <meshStandardMaterial color="#2a3040" roughness={0.9} />
        </RoundedBox>
      ))}
    </group>
  )
}

function PreHackathonScenery() {
  return (
    <group position={[-17, 0, 0]}>
      {/* "London office" — clusters of desks + chairs */}
      <Desk pos={[-4, 0, -6]} />
      <Desk pos={[-1, 0, -6]} rotation={Math.PI / 6} />
      <Desk pos={[2, 0, -5]} />
      <Desk pos={[4, 0, -7]} rotation={-Math.PI / 8} />
      <Desk pos={[-3, 0, 4]} rotation={Math.PI} />
      <Desk pos={[1, 0, 5]} />
      {/* Whiteboards */}
      <Whiteboard pos={[-6, 0, 0]} rotation={Math.PI / 2} />
      <Whiteboard pos={[6, 0, 0]} rotation={-Math.PI / 2} />
      {/* Plant accents */}
      <Plant pos={[-6.5, 0, -8]} />
      <Plant pos={[6.5, 0, 8]} />
      <Plant pos={[5, 0, -8]} />
    </group>
  )
}

function HackathonScenery() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main stage / NVIDIA-style screen at the back */}
      <RoundedBox args={[10, 4.4, 0.6]} position={[0, 2.4, -10]} radius={0.18} smoothness={3} castShadow>
        <meshStandardMaterial color="#0a0d1a" emissive="#ff4d7a" emissiveIntensity={0.18} roughness={0.5} />
      </RoundedBox>
      <Text
        position={[0, 2.6, -9.65]}
        fontSize={0.7}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0}
        letterSpacing={0.12}
      >
        LOVABLE × NVIDIA HACK
      </Text>
      <Text
        position={[0, 1.5, -9.65]}
        fontSize={0.32}
        color="#ff7596"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0}
        letterSpacing={0.16}
      >
        SEE IS BELIEVING
      </Text>
      {/* Stage platform */}
      <RoundedBox args={[10.6, 0.4, 1.6]} position={[0, 0.2, -8.6]} radius={0.06} smoothness={2} castShadow>
        <meshStandardMaterial color="#1a1f2e" roughness={0.7} />
      </RoundedBox>
      {/* Trophy podium center */}
      <Trophy pos={[0, 0, 8]} />
      {/* Audience risers */}
      <Riser pos={[-3, 0, -3]} />
      <Riser pos={[3, 0, -3]} />
      {/* Banners on poles */}
      <Banner pos={[-7, 0, -8]} color="#ff5577" />
      <Banner pos={[7, 0, -8]} color="#ff5577" />
      <Banner pos={[-7, 0, 8]} color="#7aa1ff" />
      <Banner pos={[7, 0, 8]} color="#34d399" />
    </group>
  )
}

function PostHackathonScenery() {
  return (
    <group position={[17, 0, 0]}>
      {/* Server racks (deployment) */}
      <ServerRack pos={[-5, 0, -6]} />
      <ServerRack pos={[-3, 0, -6]} />
      <ServerRack pos={[-1, 0, -6]} />
      <ServerRack pos={[1, 0, -6]} />
      <ServerRack pos={[3, 0, -6]} />
      <ServerRack pos={[5, 0, -6]} />
      {/* Pipes/vents implied by extra plants */}
      <Plant pos={[-6.5, 0, 7]} />
      <Plant pos={[6.5, 0, 7]} />
      <Plant pos={[5, 0, -8]} />
    </group>
  )
}

/* ---------- Reusable prop primitives ---------- */

function Desk({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.4, 0.07, 0.7]} radius={0.04} smoothness={2} position={[0, 0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.55} />
      </RoundedBox>
      {/* legs */}
      {[
        [-0.6, 0.35, -0.3],
        [0.6, 0.35, -0.3],
        [-0.6, 0.35, 0.3],
        [0.6, 0.35, 0.3],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#1f2332" />
        </mesh>
      ))}
      {/* monitor */}
      <RoundedBox args={[0.7, 0.45, 0.04]} radius={0.02} smoothness={2} position={[0, 1.05, -0.18]} castShadow>
        <meshStandardMaterial color="#0a0d1a" emissive="#5e88ff" emissiveIntensity={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.78, -0.15]}>
        <boxGeometry args={[0.06, 0.1, 0.06]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      {/* chair */}
      <RoundedBox args={[0.5, 0.07, 0.5]} radius={0.04} smoothness={2} position={[0, 0.45, 0.6]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.45, 0.05]} radius={0.04} smoothness={2} position={[0, 0.7, 0.85]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
    </group>
  )
}

function Whiteboard({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.04} smoothness={2} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial color="#f7f4ec" roughness={0.7} />
      </RoundedBox>
      {/* Frame */}
      <RoundedBox args={[2.5, 1.7, 0.06]} radius={0.04} smoothness={2} position={[0, 1.4, -0.04]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Stand */}
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

function Plant({ pos }: { pos: [number, number, number] }) {
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

function Trophy({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[1.6, 0.3, 1.6]} radius={0.04} smoothness={2} position={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color="#262b3d" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.2, 1.2]} radius={0.04} smoothness={2} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color="#3a4360" roughness={0.5} />
      </RoundedBox>
      {/* Trophy */}
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

function Riser({ pos }: { pos: [number, number, number] }) {
  return (
    <RoundedBox args={[2.2, 0.18, 1.8]} radius={0.04} smoothness={2} position={[pos[0], 0.09, pos[2]]} castShadow>
      <meshStandardMaterial color="#1a1f2e" roughness={0.85} />
    </RoundedBox>
  )
}

function Banner({ pos, color }: { pos: [number, number, number]; color: string }) {
  return (
    <group position={pos}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 2.8, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <RoundedBox args={[1.4, 1.8, 0.04]} radius={0.04} smoothness={2} position={[0, 1.85, 0]} castShadow>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </RoundedBox>
    </group>
  )
}

function ServerRack({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[1.0, 2.4, 0.9]} radius={0.06} smoothness={2} position={[0, 1.2, 0]} castShadow>
        <meshStandardMaterial color="#0f1320" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      {/* LED strips */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0.4 + i * 0.32, 0.46]}>
          <boxGeometry args={[0.6, 0.04, 0.02]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  )
}
