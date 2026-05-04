import { RoundedBox, Text, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import {
  SeatedNPC,
  useZoneActivity,
  Plant,
  Bookshelf,
  ConferenceTable,
  NamePlacard,
} from './SharedProps'

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
      {/* ---------- BACKDROP SKYLINE — tech park visible behind / above the wall screen ---------- */}
      <PostHackBackdrop />

      {/* ---------- BIG CENTRAL WALL SCREEN ---------- */}
      {/* Thin bezel: only ~0.12 padding around the active surface */}
      <RoundedBox args={[9.64, 3.74, 0.4]} radius={0.04} smoothness={2} position={[0, 2.5, -10.4]} castShadow>
        <meshStandardMaterial color="#0a0d1a" />
      </RoundedBox>
      {/* Active screen surface */}
      <mesh position={[0, 2.5, -10.18]}>
        <planeGeometry args={[9.4, 3.5]} />
        <meshStandardMaterial ref={screenMatRef} color="#0a0d1a" emissive="#34d399" emissiveIntensity={0.55} />
      </mesh>
      {/* Title — top-left of screen */}
      <Text
        position={[-3.2, 4.05, -10.16]}
        fontSize={0.20}
        color="#9ae5c5"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.18}
      >
        ● LIVE · POC REVIEW · ACME BANK + LOVABLE
      </Text>

      {/* Lovable logo — top-right of the green screen (real asset) */}
      <LovableLogo pos={[4.10, 4.05, -10.15]} />

      {/* Two external (client) participants — left side of screen */}
      <VideoCallTile pos={[-2.85, 2.20, -10.16]} name="MARK CHEN" role="ACME BANK · CTO" hue="#7aa1ff" skin="#e3b899" hair="#1a1410" speaking />
      <VideoCallTile pos={[-0.55, 2.20, -10.16]} name="PRIYA RAO" role="ACME BANK · HEAD OF AI" hue="#fbbf24" skin="#c89472" hair="#0e0a08" />

      {/* Chart — right side of screen */}
      <ScreenChart pos={[2.45, 2.20, -10.16]} />

      {/* ---------- CURVED CONSOLE ARRAY — restored. Each operator has a desk to work at. ---------- */}
      <ConsoleStation pos={[-3.5, 0, -5.5]} rotation={0.35} hue="#7aa1ff" />
      <ConsoleStation pos={[-1.2, 0, -6.5]} rotation={0.12} hue="#34d399" />
      <ConsoleStation pos={[1.2, 0, -6.5]} rotation={-0.12} hue="#ff7596" />
      <ConsoleStation pos={[3.5, 0, -5.5]} rotation={-0.35} hue="#fbbf24" />

      {/* ---------- SEATED NPC OPERATORS — Lovable SEs on remote calls with the client ---------- */}
      <SeatedNPC pos={[-3.5, 0, -4.5]} rotation={0.35 + Math.PI} shirtColor="#7aa1ff" />
      <SeatedNPC pos={[-1.2, 0, -5.5]} rotation={0.12 + Math.PI} shirtColor="#34d399" />
      <SeatedNPC pos={[1.2, 0, -5.5]} rotation={-0.12 + Math.PI} shirtColor="#ff7596" />
      <SeatedNPC pos={[3.5, 0, -4.5]} rotation={-0.35 + Math.PI} shirtColor="#fbbf24" />

      {/* ---------- IN-PERSON CLIENT MEETING — front-center, closest to camera (between consoles and front edge) ---------- */}
      <ClientMeeting pos={[0, 0, 4.0]} rotation={0} />

      {/* ---------- STATS STANDUP — back-left summary kiosk facing centre ---------- */}
      <StatsStandup pos={[-7, 0, -8.5]} rotation={0.689} />


      {/* ---------- AMBIENT LIGHTING ---------- */}
      <pointLight position={[0, 4, -5]} intensity={0.6} distance={20} color="#34d399" />
      <pointLight position={[-5, 3, 3]} intensity={0.35} distance={14} color="#7aa1ff" />
      <pointLight position={[5, 3, 3]} intensity={0.35} distance={14} color="#7aa1ff" />

      {/* ---------- FLOOR GRID — subtle iso grid for "tech" feel ---------- */}
      <FloorGrid />

      {/* ---------- BACKGROUND FILLERS — make the war room feel populated ---------- */}
      {/* Sprint board on left wall */}
      <OpsWhiteboard pos={[-7.6, 0, 3.5]} rotation={Math.PI / 2} />
      {/* Filing cabinets along left wall */}
      <FilingCabinet pos={[-7.6, 0, -3]} rotation={Math.PI / 2} />
      <FilingCabinet pos={[-7.6, 0, -1.5]} rotation={Math.PI / 2} />
      {/* Bookshelf on right wall */}
      <Bookshelf pos={[7.6, 0, 4]} rotation={-Math.PI / 2} />
      {/* Plants in front corners */}
      <Plant pos={[-7, 0, 9.5]} />
      <Plant pos={[7, 0, 9.5]} />
    </group>
  )
}

/* --------------------------- POST ZONE BACKDROP --------------------------- */

/**
 * Tech-park silhouette behind the wall screen. Mix of corporate towers, an Apple-style
 * circular HQ silhouette, satellite dishes, and a low data-centre block. Visible above
 * and around the wall screen to break up the empty back area.
 */
function PostHackBackdrop() {
  return (
    <group position={[0, 0, -13]}>
      {/* Sky strip — narrowed so the post-zone backdrop stays within its own zone */}
      <mesh position={[0, 6, -1.5]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#cdeed8" emissive="#dff5e6" emissiveIntensity={0.3} roughness={0.95} />
      </mesh>

      {/* Buildings — kept within zone-local x within ±7 */}
      <CorpTower pos={[-6.5, 0, 0]} h={8.5} w={1.8} color="#5a6a82" accent="#7aa1ff" />
      <CorpTower pos={[-3.5, 0, 0]} h={10.5} w={1.9} color="#a5c8e0" accent="#cfe5f5" />
      <CircularHQ pos={[-0.2, 0, -2]} />
      <ResearchLab pos={[3.5, 0, 0]} />
      <SatelliteDish pos={[6.5, 0, 0]} />
    </group>
  )
}

function CorpTower({
  pos,
  h = 9,
  w = 2.0,
  color = '#5a6a82',
  accent = '#7aa1ff',
}: {
  pos: [number, number, number]
  h?: number
  w?: number
  color?: string
  accent?: string
}) {
  return (
    <group position={pos}>
      <RoundedBox args={[w, h, w]} radius={0.05} smoothness={2} position={[0, h / 2, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
      </RoundedBox>
      {/* Window grid (front face) */}
      {Array.from({ length: Math.floor(h / 0.7) }).map((_, row) => (
        <mesh key={row} position={[0, 0.5 + row * 0.7, w / 2 + 0.012]}>
          <planeGeometry args={[w * 0.85, 0.22]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.32} />
        </mesh>
      ))}
      {/* Roof block */}
      <mesh position={[0, h, 0]}>
        <boxGeometry args={[w * 0.6, 0.5, w * 0.6]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function CircularHQ({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Outer ring */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[3.2, 0.7, 12, 48]} />
        <meshStandardMaterial color="#cfe5f5" emissive="#a5c8e0" emissiveIntensity={0.2} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Inner courtyard */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.2} roughness={0.7} />
      </mesh>
      {/* Glass facade ring */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[3.2, 0.5, 12, 48]} />
        <meshStandardMaterial color="#e0f0fa" emissive="#cfe5f5" emissiveIntensity={0.4} transparent opacity={0.65} />
      </mesh>
    </group>
  )
}

/** Research lab — slim main tower with sky-bridge to a smaller block. Replaces DataCenter. */
function ResearchLab({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Main slim tower */}
      <RoundedBox args={[1.6, 7, 1.6]} radius={0.05} smoothness={2} position={[0, 3.5, 0]} castShadow>
        <meshStandardMaterial color="#6a8290" roughness={0.6} metalness={0.15} />
      </RoundedBox>
      {/* Window strips along the front */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0.8 + i * 0.85, 0.81]}>
          <planeGeometry args={[1.3, 0.32]} />
          <meshStandardMaterial color="#cfe5f5" emissive="#a5c8e0" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Sky bridge — translucent connector to the secondary block */}
      <mesh position={[1.6, 4.0, 0]}>
        <boxGeometry args={[1.2, 0.5, 0.7]} />
        <meshStandardMaterial color="#cfe5f5" emissive="#a5c8e0" emissiveIntensity={0.3} transparent opacity={0.65} />
      </mesh>
      {/* Smaller secondary block */}
      <RoundedBox args={[1.2, 4, 1.4]} radius={0.05} smoothness={2} position={[2.7, 2, 0]} castShadow>
        <meshStandardMaterial color="#5a6a7a" roughness={0.6} />
      </RoundedBox>
      {/* Roof spike on main tower */}
      <mesh position={[0, 7.3, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0, 7.6, 0]}>
        <sphereGeometry args={[0.06, 12, 8]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

function SatelliteDish({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Squat support tower */}
      <RoundedBox args={[1.2, 4, 1.2]} radius={0.05} smoothness={2} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial color="#5a5a62" roughness={0.7} />
      </RoundedBox>
      {/* Dish */}
      <mesh position={[0, 4.6, 0.4]} rotation={[0.5, 0, 0]}>
        <sphereGeometry args={[1.0, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8e2d2" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Dish spike */}
      <mesh position={[0, 4.6, 1.0]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      {/* Antenna spike to the side */}
      <mesh position={[0.6, 5.5, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1.8, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0.6, 6.4, 0]}>
        <sphereGeometry args={[0.07, 12, 8]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.4} />
      </mesh>
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

// CoffeeCorner removed per spec

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

      {/* Single central leg */}
      <mesh position={[0, 0.30, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.55, 16]} />
        <meshStandardMaterial color="#0a0d1a" roughness={0.55} metalness={0.4} />
      </mesh>
      {/* Round base disc */}
      <mesh position={[0, 0.025, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.62, 0.05, 32]} />
        <meshStandardMaterial color="#0a0d1a" roughness={0.5} metalness={0.4} />
      </mesh>
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

/* --------------------------- VIDEO CALL UI --------------------------- */

/**
 * One tile in the wall-screen video grid. Mocks a participant's webcam feed
 * with a coloured backdrop, a silhouette head/shoulders, a name strip, and a
 * pulsing border when speaking.
 */
function VideoCallTile({
  pos,
  name,
  role,
  hue,
  skin = '#e8c19c',
  hair = '#1f1410',
  speaking = false,
}: {
  pos: [number, number, number]
  name: string
  role: string
  hue: string
  skin?: string
  hair?: string
  speaking?: boolean
}) {
  const borderRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    if (!borderRef.current) return
    const base = speaking ? 0.9 : 0.22
    const pulse = speaking ? Math.sin(state.clock.elapsedTime * 3.4) * 0.4 + 0.5 : 0
    borderRef.current.emissiveIntensity = base + pulse * 0.6
  })
  // Tile: 2.05 wide x 2.40 tall (vertical orientation)
  const W = 2.05
  const H = 2.40
  return (
    <group position={pos}>
      {/* Glowing border */}
      <mesh position={[0, 0, -0.003]}>
        <planeGeometry args={[W + 0.10, H + 0.10]} />
        <meshStandardMaterial ref={borderRef} color="#0a0d1a" emissive={hue} emissiveIntensity={0.25} />
      </mesh>
      {/* Tile background — warm desk-light gradient feel */}
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={hue} emissive={hue} emissiveIntensity={0.30} roughness={0.7} />
      </mesh>

      {/* --- Character face (matches our world's avatars) --- */}
      {/* Shoulders / shirt */}
      <mesh position={[0, -0.78, 0.005]}>
        <planeGeometry args={[1.55, 0.85]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.32, 0.006]}>
        <planeGeometry args={[0.30, 0.18]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      {/* Head (skin) */}
      <mesh position={[0, 0.10, 0.007]}>
        <circleGeometry args={[0.50, 32]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      {/* Hair cap — top half-disc */}
      <mesh position={[0, 0.22, 0.008]}>
        <circleGeometry args={[0.52, 32, 0, Math.PI]} />
        <meshStandardMaterial color={hair} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.16, 0.12, 0.010]}>
        <circleGeometry args={[0.045, 16]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      <mesh position={[0.16, 0.12, 0.010]}>
        <circleGeometry args={[0.045, 16]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      {/* Eye highlights */}
      <mesh position={[-0.148, 0.135, 0.011]}>
        <circleGeometry args={[0.012, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.172, 0.135, 0.011]}>
        <circleGeometry args={[0.012, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Cheeks — soft blush */}
      <mesh position={[-0.24, -0.02, 0.009]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#ff7596" transparent opacity={0.45} />
      </mesh>
      <mesh position={[0.24, -0.02, 0.009]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#ff7596" transparent opacity={0.45} />
      </mesh>
      {/* Mouth — smile arc, animates open when speaking */}
      <mesh position={[0, -0.10, 0.010]}>
        <planeGeometry args={[0.18, speaking ? 0.06 : 0.03]} />
        <meshStandardMaterial color="#5a2a3a" />
      </mesh>

      {/* Name strip bottom-left */}
      <mesh position={[-0.55, -1.07, 0.011]}>
        <planeGeometry args={[0.90, 0.20]} />
        <meshStandardMaterial color="#000000" opacity={0.6} transparent />
      </mesh>
      <Text
        position={[-0.55, -1.03, 0.013]}
        fontSize={0.085}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        maxWidth={0.86}
      >
        {name}
      </Text>
      <Text
        position={[-0.55, -1.13, 0.013]}
        fontSize={0.048}
        color={hue}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        {role}
      </Text>
      {/* Mic indicator bottom-right */}
      <mesh position={[0.85, -1.07, 0.011]}>
        <circleGeometry args={[0.07, 14]} />
        <meshStandardMaterial color={speaking ? '#34d399' : '#ffffff'} emissive={speaking ? '#34d399' : '#000000'} emissiveIntensity={speaking ? 0.9 : 0} opacity={0.9} transparent />
      </mesh>
    </group>
  )
}

/* --------------------------- LOVABLE LOGO (top-right of green screen) --------------------------- */

function LovableLogo({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Heart icon */}
      <Text
        position={[-0.30, 0, 0]}
        fontSize={0.32}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        ♥
      </Text>
      {/* Wordmark */}
      <Text
        position={[0.12, 0, 0]}
        fontSize={0.20}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.04}
      >
        lovable
      </Text>
    </group>
  )
}

/* --------------------------- IN-PERSON CLIENT MEETING --------------------------- */

/**
 * A small on-site working session: a Lovable solutions engineer sits across
 * from a client stakeholder at a conference table with two laptops and a
 * name placard. Reads as the in-person counterpart to the video-call wall.
 */
function ClientMeeting({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Floor pad — subtle rug to ground the area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
        <planeGeometry args={[4.4, 3.2]} />
        <meshStandardMaterial color="#1a3a2e" roughness={0.9} />
      </mesh>

      {/* Conference table */}
      <ConferenceTable pos={[0, 0, 0]} rotation={0} size={[2.6, 0.06, 1.2]} />

      {/* Two laptops on the table */}
      <Laptop pos={[-0.7, 0.81, -0.25]} rotation={Math.PI} screenColor="#7aa1ff" />
      <Laptop pos={[0.7, 0.81, 0.25]} rotation={0} screenColor="#34d399" />

      {/* Coffee cup + notebook for ambience */}
      <mesh position={[-0.05, 0.84, -0.35]}>
        <cylinderGeometry args={[0.07, 0.06, 0.13, 14]} />
        <meshStandardMaterial color="#f4ede0" roughness={0.6} />
      </mesh>
      <RoundedBox args={[0.36, 0.02, 0.26]} radius={0.01} smoothness={1} position={[0.15, 0.82, 0.32]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.7} />
      </RoundedBox>

      {/* Name placard on client's side */}
      <NamePlacard pos={[0.7, 0.82, 0.55]} rotation={Math.PI} name="Acme Bank" accent="#7aa1ff" />
      {/* Lovable SE placard */}
      <NamePlacard pos={[-0.7, 0.82, -0.55]} rotation={0} name="Lovable" accent="#ff4d7a" />

      {/* Lovable SE — pink/red shirt to match brand */}
      <SeatedNPC pos={[-0.7, 0, -1.05]} rotation={0} shirtColor="#ff4d7a" />
      {/* Client — neutral suit grey */}
      <SeatedNPC pos={[0.7, 0, 1.05]} rotation={Math.PI} shirtColor="#3a4d80" />

      {/* Standing whiteboard easel beside the table — sketched flow */}
      <MeetingEasel pos={[-2.0, 0, 0.4]} rotation={Math.PI / 2.4} />

      {/* Soft warm key light over the meeting */}
      <pointLight position={[0, 3.2, 0]} intensity={0.7} distance={6} color="#fbe1c4" />
    </group>
  )
}

function Laptop({
  pos,
  rotation = 0,
  screenColor = '#7aa1ff',
}: {
  pos: [number, number, number]
  rotation?: number
  screenColor?: string
}) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Base / keyboard */}
      <RoundedBox args={[0.55, 0.03, 0.38]} radius={0.02} smoothness={2} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" metalness={0.4} roughness={0.5} />
      </RoundedBox>
      {/* Screen — tilted open */}
      <group position={[0, 0.02, -0.18]} rotation={[-Math.PI / 2.6, 0, 0]}>
        <RoundedBox args={[0.55, 0.36, 0.02]} radius={0.02} smoothness={2} position={[0, 0.18, 0]} castShadow>
          <meshStandardMaterial color="#1f2332" />
        </RoundedBox>
        <mesh position={[0, 0.18, 0.012]}>
          <planeGeometry args={[0.50, 0.32]} />
          <meshStandardMaterial color="#0a0d1a" emissive={screenColor} emissiveIntensity={0.55} />
        </mesh>
      </group>
    </group>
  )
}

function MeetingEasel({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Board */}
      <RoundedBox args={[1.4, 1.0, 0.05]} radius={0.03} smoothness={2} position={[0, 1.5, 0]} castShadow>
        <meshStandardMaterial color="#f7f4ec" roughness={0.7} />
      </RoundedBox>
      {/* Sketched flow boxes on the board */}
      {[
        { x: -0.45, c: '#7aa1ff', label: 'IDEA' },
        { x: 0, c: '#fbbf24', label: 'POC' },
        { x: 0.45, c: '#34d399', label: 'PROD' },
      ].map((b, i) => (
        <group key={i} position={[b.x, 1.5, 0.03]}>
          <mesh>
            <planeGeometry args={[0.32, 0.22]} />
            <meshStandardMaterial color={b.c} emissive={b.c} emissiveIntensity={0.25} />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.07} color="#0a0d1a" anchorX="center" anchorY="middle" letterSpacing={0.12}>
            {b.label}
          </Text>
        </group>
      ))}
      {/* Arrows between boxes */}
      {[-0.225, 0.225].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0.03]}>
          <planeGeometry args={[0.12, 0.02]} />
          <meshStandardMaterial color="#1f2332" />
        </mesh>
      ))}
      {/* Title above */}
      <Text position={[0, 1.92, 0.04]} fontSize={0.09} color="#34d399" anchorX="center" letterSpacing={0.18}>
        DELIVERY PLAN — WK 3
      </Text>
      {/* Tripod legs */}
      <mesh position={[-0.55, 0.7, 0.2]} rotation={[0.2, 0, 0.05]}>
        <cylinderGeometry args={[0.025, 0.03, 1.4, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0.55, 0.7, 0.2]} rotation={[0.2, 0, -0.05]}>
        <cylinderGeometry args={[0.025, 0.03, 1.4, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0, 0.7, -0.25]} rotation={[-0.25, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 1.4, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
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
