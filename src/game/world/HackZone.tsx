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
  LovableHeartFloating,
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

      {/* ---------- SNACK BAR + perched Lovable heart ---------- */}
      <SnackBar pos={[-6.5, 0, 1]} />
      <LovableHeartFloating pos={[-6.5, 1.95, 1]} scale={0.32} />
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
