import { RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { SeatedNPC, useZoneActivity } from './SharedProps'

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

      {/* ---------- LIVE METRIC DISPLAYS — each one is a distinct mechanic, not a generic light box ---------- */}
      <PipelineFlow pos={[-5.5, 2.8, -3]} color="#7aa1ff" />
      <DeploysStack pos={[5.5, 2.6, -3]} color="#34d399" />
      <LatencyWave pos={[-4.5, 3.2, 4]} color="#ff7596" />
      <UptimeGauge pos={[4.5, 3.2, 4]} color="#fbbf24" />

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

/** A horizontal pipe with glowing spheres flowing through it — left to right. */
function PipelineFlow({ pos, color = '#7aa1ff', count = 6 }: { pos: [number, number, number]; color?: string; count?: number }) {
  const particleRefs = useRef<(THREE.Mesh | null)[]>([])
  const WIDTH = 2.0
  useFrame((state) => {
    const t = state.clock.elapsedTime
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const phase = ((t * 0.45 + i / count) % 1)
      mesh.position.x = -WIDTH / 2 + phase * WIDTH
      const m = mesh.material as THREE.MeshStandardMaterial
      const fade = phase < 0.08 ? phase / 0.08 : phase > 0.92 ? (1 - phase) / 0.08 : 1
      m.opacity = fade
    })
  })
  return (
    <group position={pos}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, WIDTH + 0.2, 18, 1, true]} />
        <meshStandardMaterial color="#0a0d1a" emissive={color} emissiveIntensity={0.18} side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>
      {[-1, 1].map((sign) => (
        <mesh key={sign} position={[(WIDTH / 2 + 0.1) * sign, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.16, 0.025, 8, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} />
        </mesh>
      ))}
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.085, 12, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} transparent opacity={1} />
        </mesh>
      ))}
      <Text position={[0, -0.46, 0]} fontSize={0.16} color={color} anchorX="center" letterSpacing={0.18}>
        PIPELINE
      </Text>
      <Text position={[0, -0.78, 0]} fontSize={0.34} color="#ffffff" anchorX="center" letterSpacing={0.08}>
        14 ACTIVE
      </Text>
    </group>
  )
}

/** A short stack of cubes that pulse from bottom-up — one cube per recent deploy. */
function DeploysStack({ pos, color = '#34d399' }: { pos: [number, number, number]; color?: string }) {
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([])
  const COUNT = 6
  useFrame((state) => {
    const t = state.clock.elapsedTime
    cubeRefs.current.forEach((cube, i) => {
      if (!cube) return
      const phase = (t * 0.55 + i * 0.18) % 1.0
      const intensity = 0.35 + Math.max(0, Math.sin(phase * Math.PI * 2)) * 1.6
      const m = cube.material as THREE.MeshStandardMaterial
      m.emissiveIntensity = intensity
    })
  })
  return (
    <group position={pos}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el
          }}
          position={[0, -0.55 + i * 0.18, 0]}
        >
          <boxGeometry args={[0.62 - i * 0.04, 0.13, 0.62 - i * 0.04]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      ))}
      <Text position={[0, -0.82, 0]} fontSize={0.16} color={color} anchorX="center" letterSpacing={0.18}>
        DEPLOYS
      </Text>
      <Text position={[0, -1.14, 0]} fontSize={0.34} color="#ffffff" anchorX="center" letterSpacing={0.08}>
        6 / DAY
      </Text>
    </group>
  )
}

/** A scrolling sine-wave readout — looks like a real-time oscilloscope. */
function LatencyWave({ pos, color = '#ff7596' }: { pos: [number, number, number]; color?: string }) {
  const dotRefs = useRef<(THREE.Mesh | null)[]>([])
  const COUNT = 22
  const WIDTH = 2.4
  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      const dot = dotRefs.current[i]
      if (!dot) continue
      const x = -WIDTH / 2 + (i / (COUNT - 1)) * WIDTH
      const y = Math.sin(i * 0.55 + t * 2.4) * 0.18 + Math.sin(i * 0.27 + t * 1.3) * 0.08
      dot.position.set(x, y, 0)
    }
  })
  return (
    <group position={pos}>
      {/* Baseline */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[WIDTH, 0.006, 0.001]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.4} />
      </mesh>
      {/* Wave dots */}
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
        </mesh>
      ))}
      <Text position={[0, -0.5, 0]} fontSize={0.16} color={color} anchorX="center" letterSpacing={0.18}>
        LATENCY
      </Text>
      <Text position={[0, -0.82, 0]} fontSize={0.34} color="#ffffff" anchorX="center" letterSpacing={0.08}>
        142ms
      </Text>
    </group>
  )
}

/** A circular gauge ring with a bright travelling segment — like a steady, slow loading indicator. */
function UptimeGauge({ pos, color = '#fbbf24' }: { pos: [number, number, number]; color?: string }) {
  const segmentRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (segmentRef.current) segmentRef.current.rotation.z = state.clock.elapsedTime * 0.32
  })
  return (
    <group position={pos}>
      {/* Background ring */}
      <mesh>
        <torusGeometry args={[0.55, 0.04, 14, 60]} />
        <meshStandardMaterial color="#1a1f2e" emissive={color} emissiveIntensity={0.22} />
      </mesh>
      {/* Rotating bright segment */}
      <mesh ref={segmentRef}>
        <torusGeometry args={[0.55, 0.07, 14, 60, Math.PI * 0.45]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
      {/* Inner value */}
      <Text position={[0, 0.05, 0]} fontSize={0.22} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        99.97%
      </Text>
      <Text position={[0, -0.92, 0]} fontSize={0.16} color={color} anchorX="center" letterSpacing={0.18}>
        UPTIME
      </Text>
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
