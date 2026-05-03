import { RoundedBox, Text, Image as DreiImage } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import {
  Desk,
  Trophy,
  Banner,
  Riser,
  useZoneActivity,
  HackathonTeam,
  StandingNPC,
  WinnerScreen,
} from './SharedProps'

const ZONE_CENTER_X = 0

/**
 * The Hackathon arena.
 *  - Big main stage with a Lovable-branded billboard backdrop
 *  - Rows of hackathon desks with twin monitors
 *  - Side projector screens running data tickers
 *  - Audience risers + standing banners
 *  - Trophy podium centre-front
 *  - Snack/drinks bar to one side
 */
export function HackZone() {
  const activityRef = useZoneActivity('hack')
  const billboardRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (billboardRef.current) {
      const a = activityRef.current
      const pulse = 0.45 + Math.sin(state.clock.elapsedTime * 1.2) * 0.12
      billboardRef.current.emissiveIntensity = pulse * a + 0.08
    }
  })

  return (
    <group position={[ZONE_CENTER_X, 0, 0]}>
      {/* ---------- MAIN STAGE BACKDROP ---------- */}
      {/* Billboard frame */}
      <RoundedBox args={[12, 5.4, 0.5]} radius={0.18} smoothness={3} position={[0, 3.0, -10.5]} castShadow>
        <meshStandardMaterial
          ref={billboardRef}
          color="#0a0d1a"
          emissive="#ff4d7a"
          emissiveIntensity={0.45}
          roughness={0.5}
        />
      </RoundedBox>
      {/* Lovable wordmark image as the focal of the billboard */}
      <DreiImage url="/logos/lovable-wordmark-dark.png" position={[0, 3.4, -10.2]} scale={[10, 3.6]} transparent />
      <Text
        position={[0, 0.95, -10.18]}
        fontSize={0.28}
        color="#ff7596"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        ENTERPRISE HACKATHON · BUILD DAY
      </Text>

      {/* Stage platform */}
      <RoundedBox args={[12.6, 0.5, 2.2]} radius={0.06} smoothness={2} position={[0, 0.25, -8.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1f2e" roughness={0.7} />
      </RoundedBox>
      {/* Stage front lighting strip */}
      <mesh position={[0, 0.5, -7.55]}>
        <boxGeometry args={[12, 0.04, 0.04]} />
        <meshStandardMaterial color="#ff4d7a" emissive="#ff4d7a" emissiveIntensity={1.4} />
      </mesh>

      {/* Stage podium — moved to the left edge so the billboard text reads cleanly */}
      <RoundedBox args={[1.0, 1.2, 0.7]} radius={0.06} smoothness={2} position={[-5, 1.1, -8.4]} castShadow>
        <meshStandardMaterial color="#0a0d1a" emissive="#ff4d7a" emissiveIntensity={0.18} />
      </RoundedBox>

      {/* Spotlights removed — they were obscuring the Lovable billboard from the camera angle */}

      {/* ---------- HACKATHON DESKS — pit area ---------- */}
      {/* Back row stays full; front row is trimmed because the Hackathon Team takes centre */}
      {[-3.6, -1.2, 1.2, 3.6].map((x) => (
        <Desk key={`hd1-${x}`} pos={[x, 0, -3]} twin />
      ))}
      {[-3.6, 3.6].map((x) => (
        <Desk key={`hd2-${x}`} pos={[x, 0, 0.5]} twin />
      ))}

      {/* Centre-stage: the Hackathon Team (3 builders + laptops) — what the cinematic dolly lands on */}
      <HackathonTeam pos={[0, 0, 1]} />

      {/* ---------- AUDIENCE RISERS ---------- */}
      <Riser pos={[-4, 0, 4]} size={[3.2, 0.18, 1.6]} />
      <Riser pos={[0, 0, 4]} size={[3.2, 0.18, 1.6]} />
      <Riser pos={[4, 0, 4]} size={[3.2, 0.18, 1.6]} />
      <Riser pos={[-4, 0, 5.8]} size={[3.2, 0.36, 1.6]} />
      <Riser pos={[0, 0, 5.8]} size={[3.2, 0.36, 1.6]} />
      <Riser pos={[4, 0, 5.8]} size={[3.2, 0.36, 1.6]} />

      {/* Audience standees on risers */}
      {[-4.5, -3.5, -0.5, 0.5, 3.5, 4.5].map((x, i) => (
        <Standee key={`s1-${x}`} pos={[x, 0.18, 4]} hue={i} />
      ))}
      {[-5, -4, -3, -1, 0, 1, 3, 4, 5].map((x, i) => (
        <Standee key={`s2-${x}`} pos={[x, 0.36, 5.8]} hue={i + 3} />
      ))}

      {/* ---------- SIDE PROJECTOR SCREEN — left one (with its black stand) removed ---------- */}
      <SideScreen pos={[7.5, 0, -3]} rotation={-Math.PI / 2} message="JUDGES · 23 MINS REMAINING" />

      {/* ---------- WINNER STAGE — far-right back corner, facing diagonally toward Execution booth ---------- */}
      <Trophy pos={[-2, 0, 8]} />
      {/* Group rotated -0.675 rad (~-38°) so the winner faces the Execution booth at (-5, 0, 8) */}
      <group position={[7, 0, -7]} rotation={[0, -0.675, 0]} scale={0.55}>
        <WinnerScreen pos={[0, 0, 0]} />
        <StandingNPC
          pos={[0, 0, 1.6]}
          rotation={0}
          pose="winner"
          shirtColor="#ff4d7a"
          showHeart
          skinColor="#fde0e7"
        />
      </group>

      {/* ---------- HANGING BANNERS — back-left red banner also dropped (Formats booth takes its place) ---------- */}
      <Banner pos={[7, 0, -8.5]} color="#ff5577" />
      <Banner pos={[7, 0, 8.5]} color="#34d399" />

      {/* ---------- SNACK BAR + heart fixed to its camera-facing front face ---------- */}
      <SnackBar pos={[-6.5, 0, 1]} />
      <DreiImage
        url="/logos/lovable-heart.png"
        position={[-6.5, 0.5, 1.36]}
        scale={[0.55, 0.55]}
        transparent
      />

      {/* ---------- BACKDROP SKYLINE — tech-city silhouette behind the stage ---------- */}
      <HackathonBackdrop />

      {/* ---------- JUDGING TABLE — front-centre area was empty ---------- */}
      <JudgingTable pos={[3, 0, 9.6]} />

      {/* ---------- FLOOR CABLE STRIP — runs from desks toward the stage ---------- */}
      <CableStrip from={[0, 0, 1]} to={[0, 0, -3]} />

      {/* ---------- STORAGE CRATES — convention atmosphere ---------- */}
      <Crate pos={[6.4, 0, 9.5]} color="#ff4d7a" />
      <Crate pos={[6.4, 0.55, 9.5]} color="#7aa1ff" rotated />
      <Crate pos={[7.1, 0, 7.8]} color="#34d399" />
    </group>
  )
}

/* --------------------------- HACK ZONE FILLERS --------------------------- */

/**
 * Tech-city backdrop behind the stage — visible above and around the Lovable billboard.
 * Includes a convention center silhouette, a tall tech tower, a glass office, an antenna,
 * and a low data-centre block. Bright daytime sky tone matches the energetic palette.
 */
function HackathonBackdrop() {
  return (
    <group position={[0, 0, -13]}>
      {/* Sky strip — bright daytime, slightly warmer than London's */}
      <mesh position={[0, 6, -1.5]}>
        <planeGeometry args={[28, 12]} />
        <meshStandardMaterial color="#ffd2dc" emissive="#ffe4ec" emissiveIntensity={0.3} roughness={0.95} />
      </mesh>

      {/* Tall tech tower — far left */}
      <TechTower pos={[-9, 0, 0]} h={9} w={2.0} color="#3a4d80" accent="#7aa1ff" />
      {/* Convention center — long low building */}
      <ConventionCenter pos={[-4, 0, 0]} />
      {/* Glass office tower — centre back, peeks above billboard */}
      <GlassTower pos={[0, 0, -2]} h={11} w={2.4} />
      {/* NVIDIA-style block — right of centre */}
      <NvidiaBlock pos={[5, 0, 0]} />
      {/* Antenna tower — far right */}
      <AntennaTower pos={[9, 0, 0]} />
    </group>
  )
}

function TechTower({ pos, h = 9, w = 2.0, color = '#3a4d80', accent = '#7aa1ff' }: {
  pos: [number, number, number]
  h?: number
  w?: number
  color?: string
  accent?: string
}) {
  return (
    <group position={pos}>
      <RoundedBox args={[w, h, w]} radius={0.04} smoothness={2} position={[0, h / 2, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.7} />
      </RoundedBox>
      {/* Window strips */}
      {Array.from({ length: Math.floor(h / 0.8) }).map((_, i) => (
        <mesh key={i} position={[0, 0.6 + i * 0.8, w / 2 + 0.01]}>
          <planeGeometry args={[w * 0.85, 0.18]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Roof cap */}
      <mesh position={[0, h, 0]}>
        <boxGeometry args={[w * 0.5, 0.4, w * 0.5]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function ConventionCenter({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Wide low body */}
      <RoundedBox args={[5, 4, 2]} radius={0.1} smoothness={3} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial color="#a8b8c8" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      {/* Roof curve — illusion via flatter rounded box on top */}
      <RoundedBox args={[5.4, 0.6, 2.4]} radius={0.3} smoothness={3} position={[0, 4.3, 0]}>
        <meshStandardMaterial color="#7a8898" roughness={0.5} metalness={0.3} />
      </RoundedBox>
      {/* Big front window */}
      <mesh position={[0, 1.8, 1.01]}>
        <planeGeometry args={[4, 2.2]} />
        <meshStandardMaterial color="#a5c8e0" emissive="#a5c8e0" emissiveIntensity={0.4} transparent opacity={0.85} />
      </mesh>
      {/* Banner/sign on top */}
      <Text position={[0, 4.8, 1.21]} fontSize={0.28} color="#ff4d7a" anchorX="center" letterSpacing={0.18}>
        CONVENTION CENTRE
      </Text>
    </group>
  )
}

function GlassTower({ pos, h = 10, w = 2.4 }: { pos: [number, number, number]; h?: number; w?: number }) {
  return (
    <group position={pos}>
      <RoundedBox args={[w, h, w]} radius={0.05} smoothness={2} position={[0, h / 2, 0]} castShadow>
        <meshStandardMaterial color="#cfe5f5" emissive="#a5c8e0" emissiveIntensity={0.18} roughness={0.2} metalness={0.3} />
      </RoundedBox>
      {/* Vertical mullion accents */}
      {[-w / 3, 0, w / 3].map((x, i) => (
        <mesh key={i} position={[x, h / 2, w / 2 + 0.012]}>
          <boxGeometry args={[0.04, h * 0.95, 0.005]} />
          <meshStandardMaterial color="#3a3a40" />
        </mesh>
      ))}
      {/* Roof helipad */}
      <mesh position={[0, h + 0.05, 0]}>
        <cylinderGeometry args={[w * 0.4, w * 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function NvidiaBlock({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[3.5, 6.5, 2]} radius={0.1} smoothness={3} position={[0, 3.25, 0]} castShadow>
        <meshStandardMaterial color="#0d4d2c" roughness={0.6} />
      </RoundedBox>
      {/* Window grid */}
      {Array.from({ length: 8 }).map((_, row) =>
        [-1, -0.3, 0.4, 1.1].map((x, col) => (
          <mesh key={`${row}-${col}`} position={[x, 1.0 + row * 0.7, 1.01]}>
            <planeGeometry args={[0.55, 0.4]} />
            <meshStandardMaterial color="#9ae5c5" emissive="#34d399" emissiveIntensity={0.5} />
          </mesh>
        ))
      )}
      {/* Roof signage block */}
      <mesh position={[0, 6.9, 0.5]}>
        <boxGeometry args={[2.5, 0.6, 0.06]} />
        <meshStandardMaterial color="#0a0d1a" emissive="#34d399" emissiveIntensity={0.6} />
      </mesh>
      <Text position={[0, 6.9, 0.55]} fontSize={0.4} color="#ffffff" anchorX="center" letterSpacing={0.18}>
        TECH HQ
      </Text>
    </group>
  )
}

function AntennaTower({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Squat base */}
      <RoundedBox args={[1.4, 3, 1.4]} radius={0.06} smoothness={2} position={[0, 1.5, 0]} castShadow>
        <meshStandardMaterial color="#5a5a62" roughness={0.7} />
      </RoundedBox>
      {/* Lattice tower — represented as 4 thin pillars + cross-braces */}
      {[
        [-0.4, 0, -0.4],
        [0.4, 0, -0.4],
        [-0.4, 0, 0.4],
        [0.4, 0, 0.4],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], 4.5, p[2]]}>
          <boxGeometry args={[0.05, 3, 0.05]} />
          <meshStandardMaterial color="#3a3a40" metalness={0.4} />
        </mesh>
      ))}
      {/* Antenna spike */}
      <mesh position={[0, 6.8, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.6, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      {/* Red blinking light */}
      <mesh position={[0, 7.6, 0]}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshStandardMaterial color="#ff4d7a" emissive="#ff4d7a" emissiveIntensity={1.5} />
      </mesh>
      {/* Satellite dish */}
      <mesh position={[0.4, 4.5, 0.7]} rotation={[0.5, 0.3, 0]}>
        <sphereGeometry args={[0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8e2d2" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function JudgingTable({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Long table */}
      <RoundedBox args={[2.8, 0.08, 1.0]} radius={0.04} smoothness={2} position={[0, 0.78, 0]} castShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.5} />
      </RoundedBox>
      {/* Tablecloth band */}
      <mesh position={[0, 0.4, 0.51]}>
        <planeGeometry args={[2.8, 0.78]} />
        <meshStandardMaterial color="#ff4d7a" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <Text position={[0, 0.4, 0.516]} fontSize={0.2} color="#ffffff" anchorX="center" letterSpacing={0.18}>
        JUDGES
      </Text>
      {/* Three chairs behind */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <group key={i} position={[x, 0, -0.6]}>
          <RoundedBox args={[0.5, 0.07, 0.5]} radius={0.04} smoothness={2} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#1f2332" />
          </RoundedBox>
          <RoundedBox args={[0.5, 0.55, 0.05]} radius={0.04} smoothness={2} position={[0, 0.78, -0.25]}>
            <meshStandardMaterial color="#1f2332" />
          </RoundedBox>
        </group>
      ))}
      {/* Three small placards */}
      {[-0.9, 0, 0.9].map((x) => (
        <RoundedBox key={x} args={[0.5, 0.18, 0.04]} radius={0.02} smoothness={2} rotation={[Math.PI / 12, 0, 0]} position={[x, 0.91, 0.35]}>
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </RoundedBox>
      ))}
    </group>
  )
}

function CableStrip({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const dx = to[0] - from[0]
  const dz = to[2] - from[2]
  const len = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dx, dz)
  return (
    <group position={[(from[0] + to[0]) / 2, 0.025, (from[2] + to[2]) / 2]} rotation={[0, angle, 0]}>
      <mesh>
        <boxGeometry args={[0.18, 0.05, len]} />
        <meshStandardMaterial color="#1a1a20" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Crate({ pos, color, rotated = false }: { pos: [number, number, number]; color: string; rotated?: boolean }) {
  return (
    <group position={pos} rotation={[0, rotated ? Math.PI / 5 : 0, 0]}>
      <RoundedBox args={[0.7, 0.55, 0.7]} radius={0.04} smoothness={2} position={[0, 0.275, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.6} />
      </RoundedBox>
      {/* metal bands */}
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[0.74, 0.04, 0.74]} />
        <meshStandardMaterial color="#1f2332" metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.74, 0.04, 0.74]} />
        <meshStandardMaterial color="#1f2332" metalness={0.4} />
      </mesh>
    </group>
  )
}

// SpotlightRig removed — lamps were obscuring the Lovable billboard

function SideScreen({
  pos,
  rotation,
  message,
}: {
  pos: [number, number, number]
  rotation: number
  message: string
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    if (matRef.current) {
      const phase = Math.sin(state.clock.elapsedTime * 0.8 + pos[0]) * 0.5 + 0.5
      matRef.current.emissiveIntensity = 0.6 + phase * 0.6
    }
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Frame */}
      <RoundedBox args={[3.6, 2.2, 0.12]} radius={0.04} smoothness={2} position={[0, 1.6, 0]} castShadow>
        <meshStandardMaterial color="#0a0d1a" />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 1.6, 0.07]}>
        <planeGeometry args={[3.4, 2.0]} />
        <meshStandardMaterial ref={matRef} color="#0a0d1a" emissive="#ff4d7a" emissiveIntensity={0.6} />
      </mesh>
      <Text
        position={[0, 1.6, 0.075]}
        fontSize={0.18}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.2}
        letterSpacing={0.1}
        outlineWidth={0}
      >
        {message}
      </Text>
      {/* Stand */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.6, 0.16]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function Standee({ pos, hue }: { pos: [number, number, number]; hue: number }) {
  const colors = ['#ff4d7a', '#7aa1ff', '#34d399', '#fbbf24', '#c084fc', '#f97316']
  const skin = ['#fde0e7', '#e8d6c8', '#c8a98a', '#d4b59a', '#f4d4c8']
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = pos[1] + Math.abs(Math.sin(state.clock.elapsedTime * 1.6 + hue * 0.7)) * 0.04
  })
  return (
    <group ref={groupRef} position={pos}>
      <RoundedBox args={[0.42, 0.85, 0.32]} radius={0.12} smoothness={2} position={[0, 0.5, 0]} castShadow>
        <meshStandardMaterial color={colors[hue % colors.length]} />
      </RoundedBox>
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.2, 14, 12]} />
        <meshStandardMaterial color={skin[hue % skin.length]} />
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.21, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function SnackBar({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[2.4, 0.96, 0.7]} radius={0.06} smoothness={2} position={[0, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[2.4, 0.04, 0.92]} radius={0.04} smoothness={2} position={[0, 0.98, 0]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Bottles */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.4, 10]} />
          <meshStandardMaterial color={['#34d399', '#ff4d7a', '#7aa1ff', '#fbbf24', '#c084fc'][i % 5]} emissive={['#34d399', '#ff4d7a', '#7aa1ff', '#fbbf24', '#c084fc'][i % 5]} emissiveIntensity={0.18} />
        </mesh>
      ))}
      {/* Snack stand sign */}
      <Text position={[0, 1.7, 0]} fontSize={0.16} color="#ff7596" anchorX="center" letterSpacing={0.12}>
        SNACKS · CAFFEINE · CHAOS
      </Text>
    </group>
  )
}
