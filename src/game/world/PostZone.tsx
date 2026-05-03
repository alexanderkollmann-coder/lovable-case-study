import { RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { SeatedNPC, useZoneActivity, Plant, Bookshelf } from './SharedProps'

const ZONE_CENTER_X = 17

/**
 * Post-hackathon command center.
 *  - Curved console arrangement facing a giant central screen
 *  - 3-4 seated NPC operators "ideating on POC conversion"
 *  - Holographic floating displays
 *  - Server rack stack at the back implying the deployment pipeline
 *  - Dim blue/green lighting like a mission control
 */
export function PostZone() {
  const activityRef = useZoneActivity('post')
  const screenMatRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (screenMatRef.current) {
      const a = activityRef.current
      const pulse = 0.55 + Math.sin(state.clock.elapsedTime * 1.4) * 0.15
      screenMatRef.current.emissiveIntensity = pulse * a + 0.08
    }
  })

  return (
    <group position={[ZONE_CENTER_X, 0, 0]}>
      {/* ---------- BIG CENTRAL WALL SCREEN ---------- */}
      <RoundedBox args={[10, 4.0, 0.4]} radius={0.06} smoothness={2} position={[0, 2.5, -10.4]} castShadow>
        <meshStandardMaterial color="#0a0d1a" />
      </RoundedBox>
      {/* Active screen surface */}
      <mesh position={[0, 2.5, -10.18]}>
        <planeGeometry args={[9.4, 3.5]} />
        <meshStandardMaterial ref={screenMatRef} color="#0a0d1a" emissive="#34d399" emissiveIntensity={0.55} />
      </mesh>
      <Text
        position={[0, 3.6, -10.16]}
        fontSize={0.32}
        color="#9ae5c5"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        DEPLOYMENT · POC PIPELINE · ACTIVE
      </Text>
      {/* Mock dashboard charts */}
      <ScreenChart pos={[-3, 2.4, -10.16]} accent="#34d399" label="ACTIVE POCs" value="14" />
      <ScreenChart pos={[0, 2.4, -10.16]} accent="#7aa1ff" label="MOU SIGNED" value="22" />
      <ScreenChart pos={[3, 2.4, -10.16]} accent="#ff7596" label="ARR / Q" value="£2.4M" />
      <Sparkline pos={[0, 1.5, -10.16]} />

      {/* ---------- CURVED CONSOLE ARRAY — restored. Each operator has a desk to work at. ---------- */}
      <ConsoleStation pos={[-3.5, 0, -5.5]} rotation={0.35} hue="#7aa1ff" />
      <ConsoleStation pos={[-1.2, 0, -6.5]} rotation={0.12} hue="#34d399" />
      <ConsoleStation pos={[1.2, 0, -6.5]} rotation={-0.12} hue="#ff7596" />
      <ConsoleStation pos={[3.5, 0, -5.5]} rotation={-0.35} hue="#fbbf24" />

      {/* ---------- SEATED NPC OPERATORS ---------- */}
      <SeatedNPC pos={[-3.5, 0, -4.5]} rotation={0.35 + Math.PI} shirtColor="#7aa1ff" />
      <SeatedNPC pos={[-1.2, 0, -5.5]} rotation={0.12 + Math.PI} shirtColor="#34d399" />
      <SeatedNPC pos={[1.2, 0, -5.5]} rotation={-0.12 + Math.PI} shirtColor="#ff7596" />
      <SeatedNPC pos={[3.5, 0, -4.5]} rotation={-0.35 + Math.PI} shirtColor="#fbbf24" />

      {/* Server racks removed — they were the "5 vertical black boxes" obstructing the wall screen */}

      {/* Floating metric widgets removed — all stats now consolidated on the standup board */}

      {/* ---------- STATS STANDUP — back-left summary kiosk facing centre ---------- */}
      <StatsStandup pos={[-7, 0, -8.5]} rotation={0.689} />

      {/* ---------- AMBIENT LIGHTING ---------- */}
      <pointLight position={[0, 4, -5]} intensity={0.6} distance={20} color="#34d399" />
      <pointLight position={[-5, 3, 3]} intensity={0.35} distance={14} color="#7aa1ff" />
      <pointLight position={[5, 3, 3]} intensity={0.35} distance={14} color="#7aa1ff" />

      {/* ---------- FLOOR GRID — subtle iso grid for "tech" feel ---------- */}
      <FloorGrid />

      {/* ---------- "WAR ROOM" sign ---------- */}
      <Text
        position={[0, 0.04, 8]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.55}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        DEPLOYMENT · WAR ROOM
      </Text>

      {/* ---------- BACKGROUND FILLERS — make the war room feel populated ---------- */}
      {/* Sprint board on left wall */}
      <OpsWhiteboard pos={[-7.6, 0, 3.5]} rotation={Math.PI / 2} />
      {/* Filing cabinets along left wall */}
      <FilingCabinet pos={[-7.6, 0, -3]} rotation={Math.PI / 2} />
      <FilingCabinet pos={[-7.6, 0, -1.5]} rotation={Math.PI / 2} />
      {/* Coffee corner front-right */}
      <CoffeeCorner pos={[6, 0, 7.5]} />
      {/* Bookshelf on right wall */}
      <Bookshelf pos={[7.6, 0, 4]} rotation={-Math.PI / 2} />
      {/* Plants in front corners */}
      <Plant pos={[-7, 0, 9.5]} />
      <Plant pos={[7, 0, 9.5]} />
    </group>
  )
}

/* --------------------------- POST ZONE FILLERS --------------------------- */

function OpsWhiteboard({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  const stickies: Array<{ x: number; y: number; color: string }> = [
    { x: -0.7, y: 0.4, color: '#fbbf24' },
    { x: -0.4, y: 0.5, color: '#7aa1ff' },
    { x: -0.05, y: 0.3, color: '#ff7596' },
    { x: 0.5, y: 0.6, color: '#34d399' },
    { x: 0.7, y: 0.15, color: '#fbbf24' },
    { x: -0.3, y: -0.3, color: '#7aa1ff' },
    { x: 0.3, y: -0.4, color: '#ff7596' },
    { x: 0.6, y: -0.2, color: '#34d399' },
  ]
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Frame backplate */}
      <RoundedBox args={[2.5, 1.7, 0.06]} radius={0.04} smoothness={2} position={[0, 1.4, -0.04]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Whiteboard surface */}
      <RoundedBox args={[2.4, 1.6, 0.06]} radius={0.04} smoothness={2} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial color="#f7f4ec" roughness={0.7} />
      </RoundedBox>
      {/* Sticky notes */}
      {stickies.map((s, i) => (
        <mesh key={i} position={[s.x, 1.4 + s.y, 0.04]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color={s.color} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Title */}
      <Text position={[0, 2.08, 0.05]} fontSize={0.12} color="#34d399" anchorX="center" letterSpacing={0.18}>
        SPRINT BOARD
      </Text>
      {/* Column dividers (faint) */}
      {[-0.8, 0, 0.8].map((x) => (
        <mesh key={x} position={[x, 1.4, 0.04]}>
          <boxGeometry args={[0.005, 1.5, 0.001]} />
          <meshStandardMaterial color="#9aa0aa" />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[-0.95, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0.95, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function FilingCabinet({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.7, 1.4, 0.5]} radius={0.04} smoothness={2} position={[0, 0.7, 0]} castShadow>
        <meshStandardMaterial color="#3a3a40" roughness={0.7} metalness={0.2} />
      </RoundedBox>
      {/* Drawer handles */}
      {[0.3, 0.75, 1.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.27]}>
          <boxGeometry args={[0.18, 0.04, 0.05]} />
          <meshStandardMaterial color="#9aa0aa" metalness={0.5} />
        </mesh>
      ))}
      {/* Faint drawer divider lines */}
      {[0.5, 0.95].map((y, i) => (
        <mesh key={`d-${i}`} position={[0, y, 0.26]}>
          <boxGeometry args={[0.7, 0.008, 0.001]} />
          <meshStandardMaterial color="#5a5a62" />
        </mesh>
      ))}
    </group>
  )
}

function CoffeeCorner({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Counter */}
      <RoundedBox args={[1.6, 0.96, 0.7]} radius={0.06} smoothness={2} position={[0, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[1.6, 0.04, 0.92]} radius={0.04} smoothness={2} position={[0, 0.98, 0]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Coffee machine */}
      <RoundedBox args={[0.55, 0.6, 0.42]} radius={0.04} smoothness={2} position={[0.4, 1.3, -0.06]} castShadow>
        <meshStandardMaterial color="#15171f" roughness={0.4} metalness={0.4} />
      </RoundedBox>
      {/* Indicator light */}
      <mesh position={[0.4, 1.55, 0.16]}>
        <boxGeometry args={[0.18, 0.03, 0.03]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.9} />
      </mesh>
      {/* Coffee cups */}
      <mesh position={[-0.45, 1.06, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.13, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, 1.06, 0.12]}>
        <cylinderGeometry args={[0.07, 0.08, 0.13, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Sign */}
      <Text position={[0, 1.85, 0]} fontSize={0.14} color="#34d399" anchorX="center" letterSpacing={0.18}>
        OPS COFFEE
      </Text>
    </group>
  )
}

function ConsoleStation({ pos, rotation, hue }: { pos: [number, number, number]; rotation: number; hue: string }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    if (matRef.current) {
      const phase = Math.sin(state.clock.elapsedTime * 1.4 + pos[0]) * 0.5 + 0.5
      matRef.current.emissiveIntensity = 0.55 + phase * 0.45
    }
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Console body */}
      <RoundedBox args={[2.2, 0.95, 0.9]} radius={0.05} smoothness={2} position={[0, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#0e1422" roughness={0.6} />
      </RoundedBox>
      {/* Top angled monitor surface */}
      <RoundedBox args={[2.0, 0.06, 0.7]} radius={0.04} smoothness={2} position={[0, 1.0, 0]} rotation={[-0.3, 0, 0]}>
        <meshStandardMaterial ref={matRef} color="#0a0d1a" emissive={hue} emissiveIntensity={0.6} />
      </RoundedBox>
      {/* keyboard */}
      <RoundedBox args={[1.4, 0.04, 0.32]} radius={0.02} smoothness={2} position={[0, 0.99, 0.32]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Side LED strips */}
      {[-1.05, 1.05].map((x, i) => (
        <mesh key={i} position={[x, 0.48, 0.45]}>
          <boxGeometry args={[0.04, 0.7, 0.04]} />
          <meshStandardMaterial color={hue} emissive={hue} emissiveIntensity={1.0} />
        </mesh>
      ))}
    </group>
  )
}

// Floating PipelineFlow / DeploysStack / LatencyWave components removed — metrics live on the StatsStandup

/** Standup display — consolidates Pipeline / Deploys / Latency / Uptime into one focal kiosk. */
function StatsStandup({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Outer glowing edge */}
      <RoundedBox args={[3.2, 2.6, 0.10]} radius={0.06} smoothness={2} position={[0, 1.7, -0.02]} castShadow>
        <meshStandardMaterial color="#1a1f2e" emissive="#34d399" emissiveIntensity={0.45} />
      </RoundedBox>
      {/* Display panel */}
      <RoundedBox args={[3.0, 2.4, 0.12]} radius={0.06} smoothness={2} position={[0, 1.7, 0]} castShadow>
        <meshStandardMaterial color="#0a0d1a" />
      </RoundedBox>

      {/* Header */}
      <Text position={[0, 2.78, 0.07]} fontSize={0.18} color="#9ae5c5" anchorX="center" letterSpacing={0.18}>
        LIVE OPS · POC PIPELINE
      </Text>
      <mesh position={[0, 2.62, 0.07]}>
        <boxGeometry args={[2.0, 0.012, 0.001]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.6} />
      </mesh>

      {/* 2x2 grid of KPI tiles */}
      <KPITile pos={[-0.72, 1.96, 0.07]} label="PIPELINE" value="14" sub="ACTIVE" color="#7aa1ff" />
      <KPITile pos={[0.72, 1.96, 0.07]} label="DEPLOYS" value="6" sub="/ DAY" color="#34d399" />
      <KPITile pos={[-0.72, 1.0, 0.07]} label="LATENCY" value="142" sub="ms" color="#ff7596" />
      <KPITile pos={[0.72, 1.0, 0.07]} label="UPTIME" value="99.97" sub="%" color="#fbbf24" />

      {/* Stand legs */}
      <mesh position={[-1.3, 0.25, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[1.3, 0.25, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      {/* Base bar */}
      <RoundedBox args={[2.6, 0.06, 0.2]} radius={0.02} smoothness={1} position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
    </group>
  )
}

function KPITile({
  pos,
  label,
  value,
  sub,
  color,
}: {
  pos: [number, number, number]
  label: string
  value: string
  sub: string
  color: string
}) {
  return (
    <group position={pos}>
      {/* Tile background */}
      <mesh>
        <planeGeometry args={[1.30, 0.86]} />
        <meshStandardMaterial color="#0e1422" emissive={color} emissiveIntensity={0.18} />
      </mesh>
      {/* Top accent strip */}
      <mesh position={[0, 0.41, 0.001]}>
        <boxGeometry args={[1.30, 0.012, 0.001]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} />
      </mesh>
      {/* Label */}
      <Text position={[0, 0.28, 0.003]} fontSize={0.085} color={color} anchorX="center" letterSpacing={0.18}>
        {label}
      </Text>
      {/* Value */}
      <Text position={[0, -0.02, 0.003]} fontSize={0.32} color="#ffffff" anchorX="center" letterSpacing={0.05}>
        {value}
      </Text>
      {/* Sub */}
      <Text position={[0, -0.30, 0.003]} fontSize={0.085} color={color} anchorX="center" letterSpacing={0.18}>
        {sub}
      </Text>
    </group>
  )
}

// UptimeGauge removed — uptime now appears on the StatsStandup

function ScreenChart({
  pos,
  accent,
  label,
  value,
}: {
  pos: [number, number, number]
  accent: string
  label: string
  value: string
}) {
  return (
    <group position={pos}>
      <mesh>
        <planeGeometry args={[2.5, 1.2]} />
        <meshStandardMaterial color="#0a0d1a" emissive={accent} emissiveIntensity={0.18} />
      </mesh>
      <Text position={[0, 0.34, 0.01]} fontSize={0.16} color={accent} anchorX="center" letterSpacing={0.18}>
        {label}
      </Text>
      <Text position={[0, -0.1, 0.01]} fontSize={0.42} color="#ffffff" anchorX="center" letterSpacing={0.08}>
        {value}
      </Text>
      {/* Mini bar chart */}
      <group position={[0, -0.4, 0.005]}>
        {[0.4, 0.7, 0.55, 0.85, 0.92, 0.78].map((h, i) => (
          <mesh key={i} position={[-0.7 + i * 0.28, h * 0.18, 0]}>
            <boxGeometry args={[0.18, h * 0.36, 0.005]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Sparkline({ pos }: { pos: [number, number, number] }) {
  const points = Array.from({ length: 18 }).map((_, i) => {
    const x = (i / 17) * 8 - 4
    const y = Math.sin(i * 0.55) * 0.18 + i * 0.04
    return [x, y]
  })
  return (
    <group position={pos}>
      {points.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <sphereGeometry args={[0.04, 8, 6]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function FloorGrid() {
  const lines: number[] = []
  for (let i = -7; i <= 7; i++) lines.push(i)
  return (
    <group position={[0, 0.02, 0]}>
      {lines.map((i) => (
        <mesh key={`x${i}`} position={[0, 0, i]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[15, 0.02]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} transparent opacity={0.18} />
        </mesh>
      ))}
      {lines.map((i) => (
        <mesh key={`z${i}`} position={[i, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 15]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  )
}
