import { RoundedBox, Image as DreiImage, Text, Billboard } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, type Timeline } from '@/store/gameStore'

/* -------------------------------------------------------------------------- */
/*  Zone activity helper — used by every prop to dim when the zone is inactive.  */
/* -------------------------------------------------------------------------- */

/**
 * Returns 1 when the given zone is the active timeline, lerping toward 0 when not.
 * Use inside `useFrame` to animate material colour, emissive, opacity, etc.
 */
export function useZoneActivity(zone: Timeline) {
  const ref = useRef(zone === useGameStore.getState().timeline ? 1 : 0)
  useFrame((_, delta) => {
    const store = useGameStore.getState()
    const inCinematic = store.cinematicShotId !== null
    // In cinematic mode, treat every zone as active — pans across zones don't go dark.
    const target = inCinematic ? 1 : store.timeline === zone ? 1 : 0
    if (inCinematic) {
      ref.current = target
    } else {
      ref.current = THREE.MathUtils.lerp(ref.current, target, 1 - Math.exp(-3.5 * delta))
    }
  })
  return ref
}

/* -------------------------------------------------------------------------- */
/*  Furniture & objects                                                        */
/* -------------------------------------------------------------------------- */

export function Desk({
  pos,
  rotation = 0,
  twin = false,
}: {
  pos: [number, number, number]
  rotation?: number
  twin?: boolean
}) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.6, 0.07, 0.85]} radius={0.04} smoothness={2} position={[0, 0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.55} />
      </RoundedBox>
      {[
        [-0.7, 0.35, -0.38],
        [0.7, 0.35, -0.38],
        [-0.7, 0.35, 0.38],
        [0.7, 0.35, 0.38],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#1f2332" />
        </mesh>
      ))}
      {twin ? (
        <>
          <Monitor pos={[-0.36, 1.06, -0.18]} />
          <Monitor pos={[0.36, 1.06, -0.18]} />
        </>
      ) : (
        <Monitor pos={[0, 1.06, -0.18]} />
      )}
      <Chair pos={[0, 0, 0.7]} />
    </group>
  )
}

export function Monitor({ pos, color = '#5e88ff' }: { pos: [number, number, number]; color?: string }) {
  return (
    <group position={pos}>
      <RoundedBox args={[0.7, 0.45, 0.04]} radius={0.02} smoothness={2} castShadow>
        <meshStandardMaterial color="#0a0d1a" emissive={color} emissiveIntensity={0.55} />
      </RoundedBox>
      <mesh position={[0, -0.27, 0.04]}>
        <boxGeometry args={[0.06, 0.1, 0.06]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <RoundedBox args={[0.18, 0.02, 0.12]} radius={0.01} smoothness={1} position={[0, -0.34, 0.04]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
    </group>
  )
}

export function Chair({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.5, 0.07, 0.5]} radius={0.04} smoothness={2} position={[0, 0.45, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.55, 0.05]} radius={0.04} smoothness={2} position={[0, 0.78, 0.25]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Chair stem */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#15171f" />
      </mesh>
      {/* Wheels */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.05, 5]} />
        <meshStandardMaterial color="#15171f" />
      </mesh>
    </group>
  )
}

export function Whiteboard({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.04} smoothness={2} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial color="#f7f4ec" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[2.5, 1.7, 0.06]} radius={0.04} smoothness={2} position={[0, 1.4, -0.04]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
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

export function Plant({ pos }: { pos: [number, number, number] }) {
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

export function Bookshelf({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  const bookColors = ['#7aa1ff', '#ff4d7a', '#fbbf24', '#34d399', '#c084fc', '#f97316']
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.6, 2.2, 0.5]} radius={0.04} smoothness={2} position={[0, 1.1, 0]} castShadow>
        <meshStandardMaterial color="#3a2820" roughness={0.85} />
      </RoundedBox>
      {/* Books across 4 shelves */}
      {[0.4, 0.95, 1.5, 2.05].map((y, sIdx) => (
        <group key={sIdx} position={[0, y, 0]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[(-0.6 + i * 0.18), 0, 0.1]}>
              <boxGeometry args={[0.14, 0.32, 0.18]} />
              <meshStandardMaterial color={bookColors[(sIdx * 8 + i) % bookColors.length]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export function Banner({ pos, color, rotation = 0 }: { pos: [number, number, number]; color: string; rotation?: number }) {
  const meshRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6 + pos[0]) * 0.025
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 2.8, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <group ref={meshRef}>
        <RoundedBox args={[1.4, 1.8, 0.04]} radius={0.04} smoothness={2} position={[0, 1.85, 0]} castShadow>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </RoundedBox>
      </group>
    </group>
  )
}

export function ServerRack({ pos }: { pos: [number, number, number] }) {
  const ledRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ledRef.current) return
    ledRef.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial
      if (m && m.emissiveIntensity !== undefined) {
        const phase = state.clock.elapsedTime * 1.2 + i * 0.4 + pos[0]
        m.emissiveIntensity = 0.6 + (Math.sin(phase) * 0.5 + 0.5) * 1.4
      }
    })
  })
  return (
    <group position={pos}>
      <RoundedBox args={[1.0, 2.4, 0.9]} radius={0.06} smoothness={2} position={[0, 1.2, 0]} castShadow>
        <meshStandardMaterial color="#0f1320" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      <group ref={ledRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0.4 + i * 0.32, 0.46]}>
            <boxGeometry args={[0.6, 0.04, 0.02]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function Trophy({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <RoundedBox args={[1.6, 0.3, 1.6]} radius={0.04} smoothness={2} position={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color="#262b3d" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.2, 1.2]} radius={0.04} smoothness={2} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color="#3a4360" roughness={0.5} />
      </RoundedBox>
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

export function Riser({ pos, size = [2.4, 0.18, 1.6] }: { pos: [number, number, number]; size?: [number, number, number] }) {
  return (
    <RoundedBox args={size} radius={0.04} smoothness={2} position={[pos[0], size[1] / 2, pos[2]]} castShadow>
      <meshStandardMaterial color="#1a1f2e" roughness={0.85} />
    </RoundedBox>
  )
}

/* -------------------------------------------------------------------------- */
/*  Lovable-branded decoration                                                  */
/* -------------------------------------------------------------------------- */

// Aspect ratio of the new transparent wordmark images (911 × 155).
// drei's <Image> cover-fits to its scale rectangle — if the rectangle's aspect doesn't
// match the image, the image is cropped. So we always render at the natural aspect.
const WORDMARK_ASPECT = 911 / 155 // ~5.88

export function LovablePoster({
  pos,
  rotation = 0,
  scale = 1.5,
  hideFrame = false,
  variant = 'onDark',
}: {
  pos: [number, number, number]
  rotation?: number
  /** Width of the wordmark, in world units. */
  scale?: number
  /** When true, drop the dark/red emissive frame and render only the wordmark image. */
  hideFrame?: boolean
  /** Which transparent wordmark to use: dark text (for light surfaces) or light text (for dark surfaces). */
  variant?: 'onLight' | 'onDark'
}) {
  const accentMat = useMemo(
    () => ({ color: '#0a0d1a', emissive: '#ff4d7a', emissiveIntensity: 0.18, roughness: 0.55 }),
    []
  )
  const wordmarkUrl = variant === 'onLight' ? '/logos/lovable-dark.png' : '/logos/lovable-light.png'
  const w = scale
  const h = scale / WORDMARK_ASPECT
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {!hideFrame && (
        <RoundedBox args={[w * 1.08, h * 1.6, 0.06]} radius={0.04} smoothness={2}>
          <meshStandardMaterial {...accentMat} />
        </RoundedBox>
      )}
      <DreiImage
        url={wordmarkUrl}
        position={[0, 0, hideFrame ? 0 : 0.04]}
        scale={[w, h]}
        transparent
      />
    </group>
  )
}

export function LovableHeartFloating({
  pos,
  scale = 1,
  rotation = 0,
}: {
  pos: [number, number, number]
  scale?: number
  rotation?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = rotation + Math.sin(state.clock.elapsedTime * 0.4) * 0.18
    groupRef.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.12
  })
  return (
    <group ref={groupRef} position={pos}>
      <DreiImage url="/logos/lovable-heart.png" scale={[scale, scale]} transparent />
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Standing NPC variants: presenter, winner, idle                              */
/* -------------------------------------------------------------------------- */

export type StandingPose = 'idle' | 'presenting' | 'winner'

export function StandingNPC({
  pos,
  rotation = 0,
  pose = 'idle',
  shirtColor = '#7aa1ff',
  hairColor = '#1f2332',
  skinColor = '#fde0e7',
  showHeart = false,
  hideHair = false,
  name,
  nameColor = '#ff4d7a',
}: {
  pos: [number, number, number]
  rotation?: number
  pose?: StandingPose
  shirtColor?: string
  hairColor?: string
  skinColor?: string
  showHeart?: boolean
  /** If true, no dark hemisphere hair cap is drawn on the head. */
  hideHair?: boolean
  name?: string
  nameColor?: string
}) {
  const cinematicShotId = useGameStore((s) => s.cinematicShotId)
  const groupRef = useRef<THREE.Group>(null)
  const armOffsetRef = useRef(0)
  // Subtle idle / presenting motion
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime + pos[0] * 0.5
    if (pose === 'winner') {
      // Hands up bouncing in celebration
      armOffsetRef.current = Math.abs(Math.sin(t * 4)) * 0.06
      groupRef.current.position.y = pos[1] + Math.abs(Math.sin(t * 4)) * 0.04
    } else if (pose === 'presenting') {
      // Gentle weight-shift
      groupRef.current.rotation.y = rotation + Math.sin(t * 0.8) * 0.06
    } else {
      groupRef.current.rotation.y = rotation + Math.sin(t * 0.6) * 0.03
    }
  })

  // Arm geometry varies per pose
  const armRightPos: [number, number, number] = pose === 'winner' ? [0.46, 1.6, 0] : pose === 'presenting' ? [0.46, 1.0, 0.1] : [0.46, 0.95, 0]
  const armRightRot: [number, number, number] = pose === 'winner' ? [0, 0, -0.45] : pose === 'presenting' ? [0.6, 0, 0] : [0, 0, 0]
  const armLeftPos: [number, number, number] = pose === 'winner' ? [-0.46, 1.6, 0] : [-0.46, 0.95, 0]
  const armLeftRot: [number, number, number] = pose === 'winner' ? [0, 0, 0.45] : [0, 0, 0]

  return (
    <group ref={groupRef} position={pos} rotation={[0, rotation, 0]}>
      {/* Body */}
      <RoundedBox args={[0.7, 1.0, 0.5]} radius={0.18} smoothness={3} position={[0, 0.95, 0]} castShadow>
        <meshStandardMaterial color={shirtColor} roughness={0.55} />
      </RoundedBox>
      {/* Optional Lovable heart on shirt */}
      {showHeart && (
        <DreiImage url="/logos/lovable-heart.png" position={[0, 0.97, 0.27]} scale={[0.42, 0.42]} transparent />
      )}
      {/* Head */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.32, 24, 18]} />
        <meshStandardMaterial color={skinColor} roughness={0.55} />
      </mesh>
      {/* Hair cap */}
      {!hideHair && (
        <mesh position={[0, 1.78, 0]} castShadow>
          <sphereGeometry args={[0.33, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
      )}
      {/* Eyes */}
      <mesh position={[0.11, 1.74, 0.27]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      <mesh position={[-0.11, 1.74, 0.27]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      {/* Smile (small upward arc) */}
      <mesh position={[0, 1.55, 0.28]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.07, 0.014, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#0a0d1a" />
      </mesh>
      {/* Arms */}
      <RoundedBox args={[0.18, 0.55, 0.18]} radius={0.06} smoothness={2} position={armRightPos} rotation={armRightRot} castShadow>
        <meshStandardMaterial color={skinColor} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.55, 0.18]} radius={0.06} smoothness={2} position={armLeftPos} rotation={armLeftRot} castShadow>
        <meshStandardMaterial color={skinColor} />
      </RoundedBox>
      {/* Hands (small spheres at end of arms) */}
      {pose === 'winner' && (
        <>
          <mesh position={[0.7 + armOffsetRef.current, 1.97, 0]}>
            <sphereGeometry args={[0.13, 12, 8]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[-0.7 - armOffsetRef.current, 1.97, 0]}>
            <sphereGeometry args={[0.13, 12, 8]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        </>
      )}
      {pose === 'presenting' && (
        <>
          {/* Marker in right hand */}
          <mesh position={[0.55, 1.0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.18, 8]} />
            <meshStandardMaterial color="#ff4d7a" emissive="#ff4d7a" emissiveIntensity={0.3} />
          </mesh>
        </>
      )}
      {/* Legs */}
      <RoundedBox args={[0.22, 0.45, 0.22]} radius={0.06} smoothness={2} position={[0.18, 0.32, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.45, 0.22]} radius={0.06} smoothness={2} position={[-0.18, 0.32, 0]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Soft shadow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.55, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.18} />
      </mesh>
      {/* Medal (winner only) */}
      {pose === 'winner' && (
        <>
          <mesh position={[0, 1.18, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.025, 16]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[-0.06, 1.42, 0.27]} rotation={[0, 0, 0.32]}>
            <boxGeometry args={[0.05, 0.42, 0.018]} />
            <meshStandardMaterial color="#1f2332" />
          </mesh>
          <mesh position={[0.06, 1.42, 0.27]} rotation={[0, 0, -0.32]}>
            <boxGeometry args={[0.05, 0.42, 0.018]} />
            <meshStandardMaterial color="#1f2332" />
          </mesh>
        </>
      )}
      {/* Floating name tag (above head) — only visible while a cinematic shot is playing */}
      {name && cinematicShotId !== null && (
        <Billboard position={[0, 2.45, 0]} follow lockX={false} lockY={false} lockZ={false}>
          <RoundedBox args={[0.95, 0.32, 0.05]} radius={0.04} smoothness={2}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.25} roughness={0.3} />
          </RoundedBox>
          <RoundedBox args={[0.95, 0.08, 0.05]} radius={0.02} smoothness={1} position={[0, 0.12, 0.001]}>
            <meshStandardMaterial color={nameColor} emissive={nameColor} emissiveIntensity={0.6} />
          </RoundedBox>
          <Text
            position={[0, -0.025, 0.03]}
            fontSize={0.16}
            color="#1f2332"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
            maxWidth={0.85}
          >
            {name.toUpperCase()}
          </Text>
        </Billboard>
      )}
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Cinematic-only floating name tag — used for SeatedNPCs (audience members)   */
/* -------------------------------------------------------------------------- */

export function CinematicNameTag({
  pos,
  name,
  color = '#ff4d7a',
}: {
  pos: [number, number, number]
  name: string
  color?: string
}) {
  const cinematicShotId = useGameStore((s) => s.cinematicShotId)
  const tourActive = useGameStore((s) => s.tourActive)
  // Show during cinematic shots (e.g. audience-reveal recording) but NOT during the
  // post-intro tour — Big-Ben pull-back should read as a clean wide of the office.
  if (cinematicShotId === null) return null
  if (tourActive) return null
  return (
    <Billboard position={pos} follow lockX={false} lockY={false} lockZ={false}>
      <RoundedBox args={[0.95, 0.32, 0.05]} radius={0.04} smoothness={2}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.95, 0.08, 0.05]} radius={0.02} smoothness={1} position={[0, 0.12, 0.001]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
      </RoundedBox>
      <Text
        position={[0, -0.025, 0.03]}
        fontSize={0.16}
        color="#1f2332"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        maxWidth={0.85}
      >
        {name.toUpperCase()}
      </Text>
    </Billboard>
  )
}

/* -------------------------------------------------------------------------- */
/*  Conference table + name placard                                             */
/* -------------------------------------------------------------------------- */

export function ConferenceTable({
  pos,
  rotation = 0,
  size = [3.4, 0.06, 1.1] as [number, number, number],
}: {
  pos: [number, number, number]
  rotation?: number
  size?: [number, number, number]
}) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Top */}
      <RoundedBox args={size} radius={0.03} smoothness={2} position={[0, 0.78, 0]} castShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.5} />
      </RoundedBox>
      {/* Edge trim */}
      <RoundedBox args={[size[0], 0.04, size[2] + 0.04]} radius={0.02} smoothness={2} position={[0, 0.81, 0]}>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Legs (cross-pattern feet) */}
      <mesh position={[0, 0.39, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.78, 8]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.0, 0.08, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.6]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

export function NamePlacard({
  pos,
  rotation = 0,
  name,
  accent = '#ff4d7a',
}: {
  pos: [number, number, number]
  rotation?: number
  name: string
  accent?: string
}) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.55, 0.18, 0.05]} radius={0.02} smoothness={2} rotation={[Math.PI / 12, 0, 0]} position={[0, 0.09, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.55, 0.04, 0.05]} radius={0.01} smoothness={1} rotation={[Math.PI / 12, 0, 0]} position={[0, 0.165, 0]}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </RoundedBox>
      <Text
        position={[0, 0.075, 0.028]}
        rotation={[Math.PI / 12, 0, 0]}
        fontSize={0.075}
        color="#1f2332"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        maxWidth={0.5}
      >
        {name.toUpperCase()}
      </Text>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Metrics whiteboard — chart + numbers rendered on a wall-mounted board       */
/* -------------------------------------------------------------------------- */

export function MetricsWhiteboard({
  pos,
  rotation = 0,
  title = 'HACKATHON · Q2 PIPELINE',
}: {
  pos: [number, number, number]
  rotation?: number
  title?: string
}) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Frame */}
      <RoundedBox args={[3.6, 2.4, 0.08]} radius={0.04} smoothness={2} position={[0, 1.7, -0.02]} castShadow>
        <meshStandardMaterial color="#1f2332" />
      </RoundedBox>
      {/* Board surface */}
      <RoundedBox args={[3.4, 2.2, 0.08]} radius={0.04} smoothness={2} position={[0, 1.7, 0]} castShadow>
        <meshStandardMaterial color="#f7f4ec" roughness={0.7} />
      </RoundedBox>
      {/* Title */}
      <Text
        position={[0, 2.55, 0.05]}
        fontSize={0.16}
        color="#1f2332"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
      >
        {title}
      </Text>
      <mesh position={[0, 2.42, 0.05]}>
        <boxGeometry args={[2.6, 0.012, 0.001]} />
        <meshStandardMaterial color="#ff4d7a" emissive="#ff4d7a" emissiveIntensity={0.25} />
      </mesh>

      {/* Three KPI numbers across the top */}
      <KPI pos={[-1.05, 1.95, 0.05]} label="MOUs · Q2" value="22" accent="#ff4d7a" />
      <KPI pos={[0, 1.95, 0.05]} label="POCs LIVE" value="14" accent="#7aa1ff" />
      <KPI pos={[1.05, 1.95, 0.05]} label="ARR · Q2" value="£2.4M" accent="#34d399" />

      {/* Bar chart */}
      <BarChart pos={[-0.95, 0.95, 0.05]} accent="#7aa1ff" label="HACKATHONS" />
      <BarChart pos={[0.95, 0.95, 0.05]} accent="#34d399" label="DEPLOYS" />

      {/* "Marker" arrow */}
      <Text
        position={[0, 0.4, 0.05]}
        fontSize={0.12}
        color="#ff4d7a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        HACKATHON → MOU → POC → SoW
      </Text>

      {/* Stand */}
      <mesh position={[-1.4, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[1.4, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

function KPI({ pos, label, value, accent }: { pos: [number, number, number]; label: string; value: string; accent: string }) {
  return (
    <group position={pos}>
      <Text fontSize={0.075} color="#5a5a6a" position={[0, 0.18, 0]} anchorX="center" letterSpacing={0.12}>
        {label}
      </Text>
      <Text fontSize={0.26} color={accent} position={[0, 0, 0]} anchorX="center" letterSpacing={0.05}>
        {value}
      </Text>
    </group>
  )
}

function BarChart({ pos, accent, label }: { pos: [number, number, number]; accent: string; label: string }) {
  const heights = [0.4, 0.65, 0.55, 0.85, 0.95]
  return (
    <group position={pos}>
      <Text fontSize={0.07} color="#5a5a6a" position={[0, 0.55, 0]} anchorX="center" letterSpacing={0.15}>
        {label}
      </Text>
      {heights.map((h, i) => (
        <mesh key={i} position={[-0.32 + i * 0.16, h * 0.22, 0]}>
          <boxGeometry args={[0.12, h * 0.45, 0.005]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* Baseline */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.9, 0.005, 0.001]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hackathon Team — long desk with three NPCs hunched on laptops               */
/* -------------------------------------------------------------------------- */

export function HackathonTeam({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Long desk */}
      <RoundedBox args={[3.6, 0.07, 0.85]} radius={0.04} smoothness={2} position={[0, 0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3a4d80" roughness={0.55} />
      </RoundedBox>
      {/* Legs */}
      {[
        [-1.6, 0.35, -0.38],
        [1.6, 0.35, -0.38],
        [-1.6, 0.35, 0.38],
        [1.6, 0.35, 0.38],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#1f2332" />
        </mesh>
      ))}
      {/* Three laptops */}
      {[-1.1, 0, 1.1].map((x, i) => (
        <Laptop key={i} pos={[x, 0.74, -0.05]} hue={['#5e88ff', '#34d399', '#ff7596'][i]} />
      ))}
      {/* Three seated NPCs hunched forward */}
      <SeatedNPC pos={[-1.1, 0, 0.62]} rotation={Math.PI} shirtColor="#7aa1ff" />
      <SeatedNPC pos={[0, 0, 0.62]} rotation={Math.PI} shirtColor="#34d399" />
      <SeatedNPC pos={[1.1, 0, 0.62]} rotation={Math.PI} shirtColor="#ff7596" />
      {/* Coffee cups for atmosphere */}
      <mesh position={[-0.55, 0.78, 0.3]}>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0.55, 0.78, 0.3]}>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  )
}

export function Laptop({ pos, hue = '#5e88ff' }: { pos: [number, number, number]; hue?: string }) {
  return (
    <group position={pos}>
      {/* Base / keyboard */}
      <RoundedBox args={[0.55, 0.03, 0.36]} radius={0.02} smoothness={2} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2332" roughness={0.6} />
      </RoundedBox>
      {/* Screen (open at ~100°) */}
      <group position={[0, 0.018, -0.18]} rotation={[-Math.PI / 9, 0, 0]}>
        <RoundedBox args={[0.55, 0.36, 0.02]} radius={0.02} smoothness={2} position={[0, 0.18, 0]}>
          <meshStandardMaterial color="#0a0d1a" emissive={hue} emissiveIntensity={0.7} />
        </RoundedBox>
      </group>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Winner stage — vertical "WINNER!" backdrop screen                            */
/* -------------------------------------------------------------------------- */

export function WinnerScreen({ pos, rotation = 0 }: { pos: [number, number, number]; rotation?: number }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    if (matRef.current) {
      const t = state.clock.elapsedTime
      matRef.current.emissiveIntensity = 0.55 + Math.sin(t * 1.4) * 0.18
    }
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      {/* Frame */}
      <RoundedBox args={[3.4, 2.6, 0.18]} radius={0.06} smoothness={3} position={[0, 1.5, -0.03]} castShadow>
        <meshStandardMaterial color="#0a0d1a" />
      </RoundedBox>
      {/* Glowing screen — Lovable red instead of gold */}
      <RoundedBox args={[3.2, 2.4, 0.05]} radius={0.04} smoothness={2} position={[0, 1.5, 0.05]}>
        <meshStandardMaterial ref={matRef} color="#1a0a14" emissive="#ff4d7a" emissiveIntensity={0.55} />
      </RoundedBox>
      {/* Big "WINNER!" */}
      <Text
        position={[0, 1.85, 0.085]}
        fontSize={0.66}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
        outlineWidth={0}
      >
        WINNER!
      </Text>
      {/* Sub-line */}
      <Text
        position={[0, 1.25, 0.085]}
        fontSize={0.18}
        color="#ffe0e8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        ENTERPRISE HACKATHON · 2026
      </Text>
      {/* Confetti dots */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 2.8
        const y = 0.4 + Math.random() * 0.5
        const c = ['#ff4d7a', '#7aa1ff', '#34d399', '#fbbf24'][i % 4]
        return (
          <mesh key={i} position={[x, y, 0.085]}>
            <boxGeometry args={[0.06, 0.06, 0.005]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.6} />
          </mesh>
        )
      })}
      {/* Stand */}
      <mesh position={[-1.4, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
      <mesh position={[1.4, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#1f2332" />
      </mesh>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Seated NPC for the command center                                          */
/* -------------------------------------------------------------------------- */

export function SeatedNPC({
  pos,
  rotation = 0,
  shirtColor = '#7aa1ff',
}: {
  pos: [number, number, number]
  rotation?: number
  shirtColor?: string
}) {
  const headRef = useRef<THREE.Mesh>(null)
  const armRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + pos[0]) * 0.18
    }
    if (armRef.current) {
      armRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 6 + pos[0]) * 0.18
    }
  })
  return (
    <group position={pos} rotation={[0, rotation, 0]}>
      <Chair pos={[0, 0, 0]} />
      {/* seated body — sit lower than walking avatar */}
      <RoundedBox args={[0.6, 0.7, 0.5]} radius={0.16} smoothness={3} position={[0, 0.85, 0]} castShadow>
        <meshStandardMaterial color={shirtColor} roughness={0.55} />
      </RoundedBox>
      <mesh ref={headRef} position={[0, 1.36, 0]} castShadow>
        <sphereGeometry args={[0.26, 18, 14]} />
        <meshStandardMaterial color="#fde0e7" roughness={0.55} />
      </mesh>
      {/* hair cap */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <sphereGeometry args={[0.27, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2332" roughness={0.85} />
      </mesh>
      {/* typing arm */}
      <RoundedBox ref={armRef} args={[0.16, 0.45, 0.16]} radius={0.05} smoothness={2} position={[0.32, 0.96, 0.22]}>
        <meshStandardMaterial color="#fde0e7" />
      </RoundedBox>
      <RoundedBox args={[0.16, 0.45, 0.16]} radius={0.05} smoothness={2} position={[-0.32, 0.96, 0.22]}>
        <meshStandardMaterial color="#fde0e7" />
      </RoundedBox>
    </group>
  )
}
