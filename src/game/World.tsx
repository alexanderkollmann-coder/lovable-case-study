import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS, PALETTES } from '@/store/gameStore'
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
      {/* Master ground plane — colour follows the active palette */}
      <MasterGround onGroundClick={onGroundClick} />


      {ZONES.map((zone) => (
        <ZoneFloor key={zone.timeline} {...zone} />
      ))}

      <Perimeter />

      <PreZone />
      <HackZone />
      <PostZone />

      <ZoneLights />
    </group>
  )
}

function MasterGround({ onGroundClick }: { onGroundClick: (point: THREE.Vector3) => void }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame((_, delta) => {
    if (!matRef.current) return
    const palette = PALETTES[useGameStore.getState().palette]
    tmp.set(palette.groundColor)
    matRef.current.color.lerp(tmp, 1 - Math.exp(-3 * delta))
  })
  return (
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
      <meshStandardMaterial ref={matRef} color="#0a0d18" roughness={1} metalness={0} />
    </mesh>
  )
}

/** Active zone's floor blooms with colour. Inactive zones go nearly black. */
function ZoneFloor({ timeline, center, size }: ZoneSpec) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const baseColor = useMemo(() => new THREE.Color(TIMELINE_COLORS[timeline].ground), [timeline])
  const dimmedColor = useMemo(() => new THREE.Color('#0a0d18'), [])

  useFrame((_, delta) => {
    const store = useGameStore.getState()
    const active = store.timeline === timeline
    const inCinematic = store.cinematicShotId !== null
    if (!matRef.current) return
    targetColor.copy(active ? baseColor : dimmedColor)
    if (inCinematic) {
      matRef.current.color.copy(targetColor)
      matRef.current.emissiveIntensity = active ? 0.05 : 0
    } else {
      matRef.current.color.lerp(targetColor, 1 - Math.exp(-3 * delta))
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity ?? 0,
        active ? 0.05 : 0,
        1 - Math.exp(-3 * delta)
      )
    }
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

/**
 * Sleek light-strip border that runs around the world boundary. Thin emissive lines
 * with a subtle pulse — reads as a stage's edge lighting rather than a chunky wall.
 */
function Perimeter() {
  return (
    <group>
      <PerimeterEdge x={0} z={MAP_HALF_Z + 0.05} length={MAP_HALF_X * 2 + 0.4} axis="x" />
      <PerimeterEdge x={0} z={-MAP_HALF_Z - 0.05} length={MAP_HALF_X * 2 + 0.4} axis="x" />
      <PerimeterEdge x={-MAP_HALF_X - 0.05} z={0} length={MAP_HALF_Z * 2 + 0.2} axis="z" />
      <PerimeterEdge x={MAP_HALF_X + 0.05} z={0} length={MAP_HALF_Z * 2 + 0.2} axis="z" />
    </group>
  )
}

function PerimeterEdge({
  x,
  z,
  length,
  axis,
}: {
  x: number
  z: number
  length: number
  axis: 'x' | 'z'
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    if (matRef.current) {
      const t = state.clock.elapsedTime
      matRef.current.emissiveIntensity = 0.6 + Math.sin(t * 0.4 + (x + z) * 0.05) * 0.18
    }
  })
  const w = axis === 'x' ? length : 0.04
  const d = axis === 'x' ? 0.04 : length
  return (
    <mesh position={[x, 0.04, z]}>
      <boxGeometry args={[w, 0.025, d]} />
      <meshStandardMaterial
        ref={matRef}
        color="#ffffff"
        emissive="#a8c5ff"
        emissiveIntensity={0.6}
        transparent
        opacity={0.78}
      />
    </mesh>
  )
}

// BoundaryGates removed — they obscured the view in hack timeline. Timeline transitions still fire
// automatically via Avatar's border-cross detection.
