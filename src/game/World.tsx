import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS } from '@/store/gameStore'
import type { Timeline } from '@/store/gameStore'
import { PreZone } from './world/PreZone'
import { HackZone } from './world/HackZone'
import { PostZone } from './world/PostZone'
import { ZoneLights } from './world/ZoneLights'

interface ZoneSpec {
  timeline: Timeline
  center: [number, number]
  size: [number, number]
}

const ZONES: ZoneSpec[] = [
  { timeline: 'pre', center: [-17, 0], size: [16, 22] },
  { timeline: 'hack', center: [0, 0], size: [16, 22] },
  { timeline: 'post', center: [17, 0], size: [16, 22] },
]

const MAP_HALF_X = 28
const MAP_HALF_Z = 14
export const WORLD_BOUNDS = {
  minX: -MAP_HALF_X + 1,
  maxX: MAP_HALF_X - 1,
  minZ: -MAP_HALF_Z + 1,
  maxZ: MAP_HALF_Z - 1,
}

/**
 * The world. Three richly-themed zones, plus zone-aware lighting and
 * cross-zone darkening so the active zone visually "comes alive" while the others fade.
 */
export function World({ onGroundClick }: { onGroundClick: (point: THREE.Vector3) => void }) {
  return (
    <group>
      {/* Master ground plane — collects click-to-walk raycasts */}
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
        <meshStandardMaterial color="#0a0d18" roughness={1} metalness={0} />
      </mesh>

      {ZONES.map((zone) => (
        <ZoneFloor key={zone.timeline} {...zone} />
      ))}

      <Perimeter />
      <BoundaryGates />

      <PreZone />
      <HackZone />
      <PostZone />

      <ZoneLights />

      {/* Per-zone darkening overlay: when zone is inactive, render a near-black plane that fades in */}
      {ZONES.map((z) => (
        <ZoneDimmer key={`dim-${z.timeline}`} {...z} />
      ))}
    </group>
  )
}

/** Active zone's floor blooms with colour. Inactive zones go nearly black. */
function ZoneFloor({ timeline, center, size }: ZoneSpec) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const baseColor = useMemo(() => new THREE.Color(TIMELINE_COLORS[timeline].ground), [timeline])
  const dimmedColor = useMemo(() => new THREE.Color('#0a0d18'), [])

  useFrame((_, delta) => {
    const active = useGameStore.getState().timeline === timeline
    if (!matRef.current) return
    targetColor.copy(active ? baseColor : dimmedColor)
    matRef.current.color.lerp(targetColor, 1 - Math.exp(-3 * delta))
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity ?? 0,
      active ? 0.05 : 0,
      1 - Math.exp(-3 * delta)
    )
  })

  return (
    <group position={[center[0], 0.001, center[1]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size[0], size[1], 1, 1]} />
        <meshStandardMaterial
          ref={matRef}
          color={baseColor}
          emissive={TIMELINE_COLORS[timeline].accent}
          emissiveIntensity={0.05}
          roughness={0.95}
          metalness={0}
        />
      </mesh>
      {/* Soft pulsing accent ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[Math.min(size[0], size[1]) / 2 - 0.4, Math.min(size[0], size[1]) / 2 - 0.2, 64]} />
        <meshBasicMaterial color={TIMELINE_COLORS[timeline].accent} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

/** Translucent black plane that hangs over an inactive zone, fading toward 0 when active. */
function ZoneDimmer({ timeline, center, size }: ZoneSpec) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  useFrame((_, delta) => {
    if (!matRef.current) return
    const active = useGameStore.getState().timeline === timeline
    const target = active ? 0 : 0.55
    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, target, 1 - Math.exp(-3 * delta))
  })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[center[0], 8, center[1]]}>
      <planeGeometry args={[size[0] + 4, size[1] + 4]} />
      <meshBasicMaterial ref={matRef} color="#02030a" transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
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
          <meshStandardMaterial color="#1a1f2e" roughness={0.9} />
        </RoundedBox>
      ))}
    </group>
  )
}

/**
 * Visible "gates" between zones — chevron-style portal hints that pulse to invite
 * the player across. Reinforces the auto-switch UX.
 */
function BoundaryGates() {
  return (
    <>
      <Gate x={-8.5} fromColor="#7aa1ff" toColor="#ff5577" />
      <Gate x={8.5} fromColor="#ff5577" toColor="#34d399" />
    </>
  )
}

function Gate({ x, fromColor, toColor }: { x: number; fromColor: string; toColor: string }) {
  const gateRef = useRef<THREE.Group>(null)
  const leftMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const rightMatRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (leftMatRef.current) leftMatRef.current.emissiveIntensity = 0.6 + Math.sin(t * 1.6) * 0.2
    if (rightMatRef.current) rightMatRef.current.emissiveIntensity = 0.6 + Math.sin(t * 1.6 + Math.PI) * 0.2
    if (gateRef.current) gateRef.current.position.y = Math.sin(t * 0.8) * 0.05
  })
  return (
    <group ref={gateRef} position={[x, 0.001, 0]}>
      {/* Chevron strip on the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.35, MAP_HALF_Z * 2 - 1]} />
        <meshStandardMaterial color="#0a0d1a" emissive="#ff7596" emissiveIntensity={0.4} roughness={0.5} />
      </mesh>
      {/* Side pillars */}
      <mesh position={[-0.2, 1.4, MAP_HALF_Z - 0.6]}>
        <boxGeometry args={[0.12, 2.6, 0.12]} />
        <meshStandardMaterial ref={leftMatRef} color={fromColor} emissive={fromColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.2, 1.4, -MAP_HALF_Z + 0.6]}>
        <boxGeometry args={[0.12, 2.6, 0.12]} />
        <meshStandardMaterial ref={rightMatRef} color={toColor} emissive={toColor} emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}
