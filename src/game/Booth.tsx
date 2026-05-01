import { Html, RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'
import type { BoothMeta } from '@/content/booths.config'

interface BoothProps {
  meta: BoothMeta
}

export function Booth({ meta }: BoothProps) {
  const groupRef = useRef<THREE.Group>(null)
  const accentColor = useMemo(() => new THREE.Color(meta.accent), [meta.accent])
  const [proximityId, setProximityId] = useState<string | null>(null)
  const isNearby = proximityId === meta.id
  const baseY = useRef(0)

  // listen for proximity events
  useEffect(() => {
    const onProx = (e: Event) => setProximityId((e as CustomEvent<string | null>).detail)
    window.addEventListener('booth:proximity', onProx)
    return () => window.removeEventListener('booth:proximity', onProx)
  }, [])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return
    const store = useGameStore.getState()
    const isActiveTimeline = store.timeline === meta.timeline

    // bob slightly when nearby
    const targetY = isNearby ? Math.sin(performance.now() * 0.003) * 0.08 + 0.05 : 0
    baseY.current = THREE.MathUtils.lerp(baseY.current, targetY, 1 - Math.exp(-6 * delta))
    g.position.y = baseY.current

    // visibility/transition handling — fade out when not in active timeline
    const desiredScale = isActiveTimeline ? 1 : 0.88
    g.scale.lerp(new THREE.Vector3(desiredScale, desiredScale, desiredScale), 1 - Math.exp(-3 * delta))
  })

  const store = useGameStore.getState()
  const isActiveTimeline = store.timeline === meta.timeline

  return (
    <group
      ref={groupRef}
      position={meta.position}
      rotation={[0, meta.rotation ?? 0, 0]}
      onPointerDown={(e) => {
        if (e.button !== 0) return
        if (!isActiveTimeline) return
        e.stopPropagation()
        useGameStore.getState().openBooth(meta.id)
      }}
    >
      {/* Glow ring on ground when nearby */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.3, 1.6, 48]} />
        <meshBasicMaterial color={accentColor} transparent opacity={isNearby ? 0.7 : 0.18} />
      </mesh>
      {/* Plinth */}
      <RoundedBox args={[1.6, 0.18, 1.6]} radius={0.05} smoothness={2} position={[0, 0.09, 0]} castShadow>
        <meshStandardMaterial color="#1a1f2e" roughness={0.55} />
      </RoundedBox>
      {/* Accent base */}
      <RoundedBox args={[1.4, 0.22, 1.4]} radius={0.05} smoothness={2} position={[0, 0.3, 0]} castShadow>
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isNearby ? 0.55 : 0.18}
          roughness={0.4}
        />
      </RoundedBox>
      {/* Vertical stem */}
      <RoundedBox args={[0.18, 1.6, 0.18]} radius={0.04} smoothness={2} position={[0, 1.2, 0]} castShadow>
        <meshStandardMaterial color="#1a1f2e" roughness={0.6} />
      </RoundedBox>
      {/* Sign card */}
      <RoundedBox args={[1.7, 0.85, 0.06]} radius={0.05} smoothness={3} position={[0, 2.0, 0]} castShadow>
        <meshStandardMaterial
          color="#0a0d1a"
          emissive={accentColor}
          emissiveIntensity={isNearby ? 0.45 : 0.18}
          roughness={0.45}
        />
      </RoundedBox>
      {/* Sign edge accent */}
      <RoundedBox args={[1.78, 0.93, 0.04]} radius={0.05} smoothness={3} position={[0, 2.0, -0.02]}>
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={isNearby ? 0.85 : 0.4} />
      </RoundedBox>
      {/* Sign label */}
      <Text
        position={[0, 2.06, 0.04]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
        letterSpacing={0.04}
        outlineWidth={0}
      >
        {meta.label.toUpperCase()}
      </Text>
      <Text
        position={[0, 1.78, 0.04]}
        fontSize={0.1}
        color={meta.accent}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
        letterSpacing={0.18}
      >
        ENTER · PRESS E
      </Text>

      {/* Floating "Press E" hint when nearby */}
      {isNearby && isActiveTimeline && (
        <Html position={[0, 2.9, 0]} center distanceFactor={9} occlude={false} zIndexRange={[10, 0]}>
          <div className="no-select pointer-events-none">
            <div
              className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide animate-glow-pulse"
              style={{
                background: 'rgba(15, 18, 30, 0.85)',
                color: meta.accent,
                border: `1px solid ${meta.accent}`,
                boxShadow: `0 0 24px ${meta.accent}66`,
                backdropFilter: 'blur(6px)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ opacity: 0.7, marginRight: 6 }}>PRESS</span>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0 6px',
                  borderRadius: 4,
                  border: `1px solid ${meta.accent}`,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                }}
              >
                E
              </span>
              <span style={{ opacity: 0.7, marginLeft: 6 }}>TO ENTER</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
