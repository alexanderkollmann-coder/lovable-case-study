import { RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { ServerRack, SeatedNPC, useZoneActivity } from './SharedProps'

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

      {/* Console stations removed for cleaner sightline to the wall screen — operators sit at chairs only */}

      {/* ---------- SEATED NPC OPERATORS ---------- */}
      <SeatedNPC pos={[-3.5, 0, -4.5]} rotation={0.35 + Math.PI} shirtColor="#7aa1ff" />
      <SeatedNPC pos={[-1.2, 0, -5.5]} rotation={0.12 + Math.PI} shirtColor="#34d399" />
      <SeatedNPC pos={[1.2, 0, -5.5]} rotation={-0.12 + Math.PI} shirtColor="#ff7596" />
      <SeatedNPC pos={[3.5, 0, -4.5]} rotation={-0.35 + Math.PI} shirtColor="#fbbf24" />

      {/* ---------- BACK INFRASTRUCTURE — server rack stack ---------- */}
      {[-3, -1.5, 0, 1.5, 3].map((x) => (
        <ServerRack key={x} pos={[x, 0, -8.4]} />
      ))}

      {/* ---------- HOLOGRAPHIC FLOATING DISPLAYS ---------- */}
      <Hologram pos={[-5.5, 2.8, -3]} text="PIPELINE" sub="14 ACTIVE" color="#7aa1ff" />
      <Hologram pos={[5.5, 2.8, -3]} text="DEPLOYS" sub="6 / DAY" color="#34d399" />
      <Hologram pos={[-4.5, 3.2, 4]} text="LATENCY" sub="142ms" color="#ff7596" />
      <Hologram pos={[4.5, 3.2, 4]} text="UPTIME" sub="99.97%" color="#fbbf24" />

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
    </group>
  )
}

// ConsoleStation removed — clears sightline to the wall screen per the declutter spec

function Hologram({
  pos,
  text,
  sub,
  color,
}: {
  pos: [number, number, number]
  text: string
  sub: string
  color: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4 + pos[0]) * 0.2
      groupRef.current.position.y = pos[1] + Math.sin(t * 0.7 + pos[0]) * 0.1
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + Math.sin(t * 1.6 + pos[0]) * 0.18
    }
  })
  return (
    <group ref={groupRef} position={pos}>
      <mesh>
        <planeGeometry args={[1.6, 0.96]} />
        <meshStandardMaterial
          ref={matRef}
          color="#0a0d1a"
          emissive={color}
          emissiveIntensity={0.55}
          transparent
          opacity={0.78}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text position={[0, 0.18, 0.01]} fontSize={0.22} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        {text}
      </Text>
      <Text position={[0, -0.16, 0.01]} fontSize={0.34} color={color} anchorX="center" anchorY="middle" letterSpacing={0.05}>
        {sub}
      </Text>
      {/* Holo-emitter base */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.08, 12]} />
        <meshStandardMaterial color="#1f2332" emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Beam */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.18, 0.62, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

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
