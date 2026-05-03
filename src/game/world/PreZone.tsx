import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import {
  Desk,
  Whiteboard,
  Plant,
  Bookshelf,
  LovablePoster,
  useZoneActivity,
  StandingNPC,
  SeatedNPC,
  ConferenceTable,
  CinematicNameTag,
  MetricsWhiteboard,
} from './SharedProps'

const ZONE_CENTER_X = -17

/**
 * The London-themed pre-hackathon zone.
 *  - Skyline of London landmarks at the back (Big Ben, Tower Bridge towers, The Shard, London Eye)
 *  - Foreground: an interior office space with desks, whiteboards, bookshelves, plants
 *  - Wall poster with the Lovable wordmark
 *  - Cute red phone box and a parked double-decker bus, just because
 */
export function PreZone() {
  const activityRef = useZoneActivity('pre')
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    // dim siblings (props/landmarks) globally — material lerps via traverse
    g.traverse((child) => {
      const m = (child as THREE.Mesh).material
      if (m && 'emissiveIntensity' in m) {
        // Skip — emissive props handle their own state per useFrame in shared props
      }
    })
  })

  return (
    <group ref={groupRef} position={[ZONE_CENTER_X, 0, 0]}>
      {/* ---------- LONDON SKYLINE (back wall, far -z) ---------- */}
      <LondonSkyline activityRef={activityRef} />

      {/* ---------- INTERIOR OFFICE FLOOR ---------- */}
      {/* Light office wall — segmented around the windows so they're true see-through openings */}
      <OfficeBackWall />
      {/* Lovable wordmark — transparent dark-text version on the now-light wall */}
      <LovablePoster pos={[-6, 2.95, -10.3]} scale={1.4} hideFrame variant="onLight" />

      {/* ---------- DESKS — open-plan rows (the centre column is reserved for the meeting scene) ---------- */}
      <Desk pos={[-5, 0, -7]} twin />
      <Desk pos={[4, 0, -7]} twin />

      <Desk pos={[-5, 0, -3]} rotation={Math.PI} twin />
      <Desk pos={[4, 0, -3]} rotation={Math.PI} twin />

      {/* ---------- ALEX'S PITCH — meeting rotated 45° CW so the camera sees the whiteboard at an angle, Alex's 3/4 face, and the backs of the audience ---------- */}
      <group position={[-2.5, 0, 7]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Whiteboard, scaled down ~25% so it doesn't overpower the frame */}
        <group position={[-3.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.78}>
          <MetricsWhiteboard pos={[0, 0, 0]} title="HACKATHON · Q2 PIPELINE" />
        </group>

        {/* Alex */}
        <StandingNPC
          pos={[-1.5, 0, 0]}
          rotation={Math.PI / 2}
          pose="presenting"
          shirtColor="#0d111c"
          showHeart
          hideHair
          name="ALEX"
          nameColor="#ff4d7a"
        />

        {/* Conference table */}
        <ConferenceTable pos={[0.5, 0, 0]} rotation={Math.PI / 2} size={[2.8, 0.06, 1.0]} />

        {/* Audience facing Alex */}
        <SeatedNPC pos={[1.5, 0, -1.4]} rotation={-Math.PI / 2} shirtColor="#7aa1ff" />
        <SeatedNPC pos={[1.5, 0, 0]} rotation={-Math.PI / 2} shirtColor="#34d399" />
        <SeatedNPC pos={[1.5, 0, 1.4]} rotation={-Math.PI / 2} shirtColor="#fbbf24" />

        {/* Cinematic-only floating nametags above each audience member */}
        <CinematicNameTag pos={[1.5, 2.1, -1.4]} name="RYAN" color="#7aa1ff" />
        <CinematicNameTag pos={[1.5, 2.1, 0]} name="KALI" color="#34d399" />
        <CinematicNameTag pos={[1.5, 2.1, 1.4]} name="MONICA" color="#fbbf24" />
      </group>

      {/* Reception desk removed — it was sitting in the same area as the meeting whiteboard */}

      {/* Coffee station */}
      <CoffeeMachine pos={[-2, 0, 5.5]} />

      {/* Whiteboards */}
      <Whiteboard pos={[6.5, 0, 0]} rotation={-Math.PI / 2} />
      <Whiteboard pos={[6.5, 0, 5]} rotation={-Math.PI / 2} />

      {/* Bookshelf row */}
      <Bookshelf pos={[-7.4, 0, 0]} rotation={Math.PI / 2} />
      <Bookshelf pos={[-7.4, 0, 3]} rotation={Math.PI / 2} />

      {/* Plants */}
      <Plant pos={[-7.5, 0, -8]} />
      <Plant pos={[5.5, 0, 9]} />
      <Plant pos={[7, 0, -2]} />
      {/* Moved out of the meeting area to sit beside the front-left street lamp */}
      <Plant pos={[-6.5, 0, 9]} />

      {/* Red phone box (a London staple) */}
      <PhoneBox pos={[5.5, 0, 6.5]} />

      {/* Double-decker bus, parked further back */}
      <Bus pos={[3, 0, -10]} />

      {/* Street lamps */}
      <StreetLamp pos={[-7.5, 0, 9]} />
      <StreetLamp pos={[7.5, 0, 9]} />
    </group>
  )
}

/* ----------------------------- OFFICE BACK WALL ----------------------------- */

/**
 * Light office wall, segmented to leave four genuine see-through window openings.
 * Top + bottom strips run full width; vertical pillars sit between the windows. Each
 * opening gets a slim dark frame with a centre mullion (an office-window look).
 */
function OfficeBackWall() {
  const WALL_COLOR = '#e6dfcd' // soft warm cream
  const FRAME_COLOR = '#2a2a32'
  const BASE_Z = -10.6
  const WINDOWS = [-4, -1, 2, 5] // x centres of each window
  const WINDOW_W = 1.6
  const WINDOW_H = 1.2
  const WINDOW_Y = 2.0 // centre y
  const WALL_HALF_X = 7

  // y range covered by windows
  const winTop = WINDOW_Y + WINDOW_H / 2 // 2.6
  const winBottom = WINDOW_Y - WINDOW_H / 2 // 1.4
  const wallTopY = 3.4 // top of wall
  const wallBottomY = 0 // floor

  // Pillar segments (between/around windows) at the window y range
  const halfW = WINDOW_W / 2
  const xs = WINDOWS.slice().sort((a, b) => a - b)
  const pillars: Array<[number, number]> = []
  let cursor = -WALL_HALF_X
  for (const wx of xs) {
    const wLeft = wx - halfW
    if (wLeft > cursor) {
      const w = wLeft - cursor
      pillars.push([cursor + w / 2, w])
    }
    cursor = wx + halfW
  }
  if (cursor < WALL_HALF_X) {
    const w = WALL_HALF_X - cursor
    pillars.push([cursor + w / 2, w])
  }

  return (
    <group>
      {/* Top strip */}
      <RoundedBox
        args={[WALL_HALF_X * 2, wallTopY - winTop, 0.3]}
        radius={0.04}
        smoothness={2}
        position={[0, (wallTopY + winTop) / 2, BASE_Z]}
        castShadow
      >
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </RoundedBox>
      {/* Bottom strip */}
      <RoundedBox
        args={[WALL_HALF_X * 2, winBottom - wallBottomY, 0.3]}
        radius={0.04}
        smoothness={2}
        position={[0, (winBottom + wallBottomY) / 2, BASE_Z]}
        castShadow
      >
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </RoundedBox>
      {/* Pillars between windows (only at window y range) */}
      {pillars.map(([cx, w]) => (
        <RoundedBox
          key={`p-${cx}`}
          args={[w, WINDOW_H, 0.3]}
          radius={0.04}
          smoothness={2}
          position={[cx, WINDOW_Y, BASE_Z]}
          castShadow
        >
          <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
        </RoundedBox>
      ))}
      {/* Window frames — sit slightly forward of the wall */}
      {WINDOWS.map((x) => (
        <WindowFrame key={`f-${x}`} x={x} y={WINDOW_Y} z={BASE_Z + 0.16} w={WINDOW_W} h={WINDOW_H} color={FRAME_COLOR} />
      ))}
    </group>
  )
}

function WindowFrame({
  x,
  y,
  z,
  w,
  h,
  color,
}: {
  x: number
  y: number
  z: number
  w: number
  h: number
  color: string
}) {
  const T = 0.05 // frame thickness
  const D = 0.04 // frame depth
  return (
    <group position={[x, y, z]}>
      {/* Top */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w + T * 2, T, D]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -h / 2, 0]}>
        <boxGeometry args={[w + T * 2, T, D]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Left */}
      <mesh position={[-w / 2, 0, 0]}>
        <boxGeometry args={[T, h, D]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Right */}
      <mesh position={[w / 2, 0, 0]}>
        <boxGeometry args={[T, h, D]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Centre vertical mullion */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[T * 0.7, h, D * 0.6]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  )
}

/* ----------------------------- LONDON SKYLINE ----------------------------- */

function LondonSkyline({ activityRef }: { activityRef: React.MutableRefObject<number> }) {
  return (
    <group position={[0, 0, -13]}>
      {/* Sky backdrop strip with subtle gradient feel */}
      <mesh position={[0, 6, -1.5]}>
        <planeGeometry args={[28, 12]} />
        <meshStandardMaterial color="#3b507d" emissive="#7aa1ff" emissiveIntensity={0.08} roughness={0.95} />
      </mesh>

      <BigBen pos={[-9, 0, 0]} activityRef={activityRef} />
      <TheShard pos={[-3.5, 0, 0]} activityRef={activityRef} />
      <LondonEye pos={[1.5, 0, 0]} activityRef={activityRef} />
      <TowerBridge pos={[7, 0, 0]} activityRef={activityRef} />
    </group>
  )
}

/* Big Ben — a tall tower with a clock face and a spire */
function BigBen({ pos, activityRef }: { pos: [number, number, number]; activityRef: React.MutableRefObject<number> }) {
  const clockRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(() => {
    if (clockRef.current) clockRef.current.emissiveIntensity = 0.6 * activityRef.current + 0.05
  })
  return (
    <group position={pos}>
      {/* base */}
      <RoundedBox args={[1.4, 4, 1.4]} radius={0.04} smoothness={2} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial color="#a78366" roughness={0.85} />
      </RoundedBox>
      {/* clock-face section */}
      <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.04} smoothness={2} position={[0, 4.6, 0]} castShadow>
        <meshStandardMaterial color="#8e6a52" roughness={0.85} />
      </RoundedBox>
      {/* clock face on each side */}
      {[
        [0, 4.6, 0.81],
        [0, 4.6, -0.81],
        [0.81, 4.6, 0],
        [-0.81, 4.6, 0],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          rotation={i === 2 ? [0, Math.PI / 2, 0] : i === 3 ? [0, -Math.PI / 2, 0] : i === 1 ? [0, Math.PI, 0] : [0, 0, 0]}
        >
          <circleGeometry args={[0.5, 24]} />
          <meshStandardMaterial ref={i === 0 ? clockRef : null} color="#fff8e0" emissive="#ffd87a" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {/* upper section */}
      <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.04} smoothness={2} position={[0, 6, 0]} castShadow>
        <meshStandardMaterial color="#a78366" roughness={0.85} />
      </RoundedBox>
      {/* spire */}
      <mesh position={[0, 7.4, 0]} castShadow>
        <coneGeometry args={[0.7, 1.6, 4]} />
        <meshStandardMaterial color="#3a4d80" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* gold tip */}
      <mesh position={[0, 8.4, 0]}>
        <sphereGeometry args={[0.12, 12, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

function TheShard({ pos, activityRef }: { pos: [number, number, number]; activityRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(() => {
    if (matRef.current) matRef.current.emissiveIntensity = 0.4 * activityRef.current + 0.05
  })
  return (
    <group position={pos}>
      <mesh position={[0, 4.5, 0]} castShadow>
        <coneGeometry args={[1.0, 9, 4]} />
        <meshStandardMaterial ref={matRef} color="#a8c5ff" emissive="#7aa1ff" emissiveIntensity={0.4} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  )
}

function LondonEye({ pos, activityRef }: { pos: [number, number, number]; activityRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringMatRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.05 * activityRef.current
    if (ringMatRef.current) ringMatRef.current.emissiveIntensity = 0.6 * activityRef.current + 0.08
  })
  return (
    <group position={pos}>
      {/* Wheel */}
      <group ref={groupRef} position={[0, 3, 0]}>
        <mesh>
          <torusGeometry args={[2.4, 0.08, 12, 64]} />
          <meshStandardMaterial ref={ringMatRef} color="#7aa1ff" emissive="#5e88ff" emissiveIntensity={0.6} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <mesh key={i} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.04, 4.8, 0.04]} />
              <meshStandardMaterial color="#5e88ff" emissive="#5e88ff" emissiveIntensity={0.3} />
            </mesh>
          )
        })}
        {/* Capsules */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <mesh key={`c-${i}`} position={[Math.cos(angle) * 2.4, Math.sin(angle) * 2.4, 0]}>
              <boxGeometry args={[0.32, 0.18, 0.18]} />
              <meshStandardMaterial color="#9ae5c5" emissive="#34d399" emissiveIntensity={0.3} />
            </mesh>
          )
        })}
      </group>
      {/* Stand */}
      <mesh position={[-0.6, 1.4, 0]} rotation={[0, 0, 0.4]} castShadow>
        <boxGeometry args={[0.14, 3.4, 0.14]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0.6, 1.4, 0]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.14, 3.4, 0.14]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function TowerBridge({ pos, activityRef }: { pos: [number, number, number]; activityRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(() => {
    if (matRef.current) matRef.current.emissiveIntensity = 0.5 * activityRef.current + 0.05
  })
  return (
    <group position={pos}>
      {/* Two towers */}
      {[-1.6, 1.6].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <RoundedBox args={[1.0, 4.4, 1.0]} radius={0.04} smoothness={2} position={[0, 2.2, 0]} castShadow>
            <meshStandardMaterial color="#a78366" roughness={0.85} />
          </RoundedBox>
          {/* Top spire */}
          <mesh position={[0, 4.9, 0]} castShadow>
            <coneGeometry args={[0.6, 1.0, 4]} />
            <meshStandardMaterial color="#3a4d80" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 5.5, 0]}>
            <sphereGeometry args={[0.08, 10, 6]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
      {/* Connecting walkway */}
      <RoundedBox args={[3.2, 0.4, 0.6]} radius={0.04} smoothness={2} position={[0, 3.6, 0]} castShadow>
        <meshStandardMaterial ref={matRef} color="#5e88ff" emissive="#7aa1ff" emissiveIntensity={0.5} />
      </RoundedBox>
      {/* Suspended cables */}
      <mesh position={[0, 2.6, 0.32]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.6, 0.04, 6, 16, Math.PI]} />
        <meshStandardMaterial color="#5e88ff" emissive="#7aa1ff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

/* ------------------------------- INTERIOR PROPS ----------------------------- */

function CoffeeMachine({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[1.2, 0.8, 0.7]} radius={0.04} smoothness={2} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color="#1a1f2e" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.9, 0.45, 0.5]} radius={0.04} smoothness={2} position={[0, 1.05, 0]} castShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.4} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.5, 0.36]}>
        <boxGeometry args={[0.45, 0.06, 0.06]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function PhoneBox({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[0.9, 2.4, 0.9]} radius={0.04} smoothness={2} position={[0, 1.2, 0]} castShadow>
        <meshStandardMaterial color="#c1272d" roughness={0.5} emissive="#c1272d" emissiveIntensity={0.12} />
      </RoundedBox>
      {/* roof */}
      <RoundedBox args={[1.0, 0.18, 1.0]} radius={0.04} smoothness={2} position={[0, 2.5, 0]} castShadow>
        <meshStandardMaterial color="#7a1a1f" roughness={0.5} />
      </RoundedBox>
      {/* windows on each side */}
      {[
        [0, 1.5, 0.46],
        [0, 1.5, -0.46],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <planeGeometry args={[0.7, 1.2]} />
          <meshStandardMaterial color="#e0d4ff" emissive="#a8c5ff" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function Bus({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Lower deck */}
      <RoundedBox args={[3.6, 0.9, 1.3]} radius={0.06} smoothness={2} position={[0, 0.7, 0]} castShadow>
        <meshStandardMaterial color="#c1272d" roughness={0.5} emissive="#c1272d" emissiveIntensity={0.1} />
      </RoundedBox>
      {/* Upper deck */}
      <RoundedBox args={[3.4, 0.9, 1.3]} radius={0.06} smoothness={2} position={[0, 1.7, 0]} castShadow>
        <meshStandardMaterial color="#c1272d" roughness={0.5} emissive="#c1272d" emissiveIntensity={0.1} />
      </RoundedBox>
      {/* Top trim */}
      <RoundedBox args={[3.6, 0.06, 1.34]} radius={0.04} smoothness={1} position={[0, 2.18, 0]}>
        <meshStandardMaterial color="#7a1a1f" />
      </RoundedBox>
      {/* Windows top */}
      {[-1.2, -0.4, 0.4, 1.2].map((x) => (
        <mesh key={`u-${x}`} position={[x, 1.85, 0.66]}>
          <planeGeometry args={[0.55, 0.5]} />
          <meshStandardMaterial color="#a8c5ff" emissive="#a8c5ff" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {/* Windows bottom */}
      {[-1.2, -0.4, 0.4, 1.2].map((x) => (
        <mesh key={`l-${x}`} position={[x, 0.85, 0.66]}>
          <planeGeometry args={[0.55, 0.4]} />
          <meshStandardMaterial color="#a8c5ff" emissive="#a8c5ff" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {/* Wheels */}
      {[-1.3, 1.3].map((x) => (
        <mesh key={`w-${x}`} position={[x, 0.3, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.18, 14]} />
          <meshStandardMaterial color="#15171f" />
        </mesh>
      ))}
      {[-1.3, 1.3].map((x) => (
        <mesh key={`w2-${x}`} position={[x, 0.3, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.18, 14]} />
          <meshStandardMaterial color="#15171f" />
        </mesh>
      ))}
    </group>
  )
}

function StreetLamp({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 2.8, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0, 2.85, 0]}>
        <sphereGeometry args={[0.18, 12, 10]} />
        <meshStandardMaterial color="#fff5d6" emissive="#fbbf24" emissiveIntensity={1.4} />
      </mesh>
      <pointLight position={[0, 2.85, 0]} intensity={0.4} distance={5} color="#fbd38b" />
    </group>
  )
}
