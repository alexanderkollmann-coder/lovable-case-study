import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGameStore, TIMELINE_COLORS } from '@/store/gameStore'

const TRANSITION_DURATION = 1.2

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  // 2D simplex-ish noise — cheap and good enough for clouds
  vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash22(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
          dot(hash22(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
      mix(dot(hash22(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
          dot(hash22(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Sweep window — soft band moving from right (uv.x=1) to left (uv.x=0)
    float sweepPos = 1.0 - uProgress * 1.8 + 0.4; // covers [-0.4, 1.4]
    float bandWidth = 0.65;
    float dist = (vUv.x - sweepPos) / bandWidth;
    float bandMask = exp(-dist * dist * 4.0); // gaussian falloff

    vec2 cloudUv = vUv * vec2(3.0, 1.6) + vec2(uTime * 0.05, 0.0);
    float clouds = fbm(cloudUv) * 0.5 + 0.5;
    float density = pow(clouds, 1.4);

    // Two-tone tint between A (outgoing) and B (incoming)
    vec3 tint = mix(uColorA, uColorB, smoothstep(0.0, 1.0, uProgress));
    float alpha = bandMask * density * 0.92;
    gl_FragColor = vec4(tint, alpha);
  }
`

export function CloudSweep() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const progressRef = useRef(0)
  const startedAt = useRef<number | null>(null)
  const fromColor = useMemo(() => new THREE.Color(), [])
  const toColor = useMemo(() => new THREE.Color(), [])

  // listen for transition begin
  useEffect(() => {
    const unsub = useGameStore.subscribe((state, prev) => {
      if (state.isTransitioning && !prev.isTransitioning && state.pendingTimeline) {
        const from = TIMELINE_COLORS[state.timeline].fog
        const to = TIMELINE_COLORS[state.pendingTimeline].fog
        fromColor.set(from)
        toColor.set(to)
        progressRef.current = 0
        startedAt.current = performance.now()
      }
    })
    return unsub
  }, [fromColor, toColor])

  useFrame((state) => {
    const mat = matRef.current
    const mesh = meshRef.current
    if (!mat || !mesh) return

    if (startedAt.current !== null) {
      const elapsed = (performance.now() - startedAt.current) / 1000
      const t = Math.min(1, elapsed / TRANSITION_DURATION)
      progressRef.current = t

      // Switch the timeline at midpoint so the destination is revealed under the sweep
      if (t >= 0.5 && useGameStore.getState().pendingTimeline) {
        useGameStore.getState().setTimeline(useGameStore.getState().pendingTimeline!)
      }

      if (t >= 1) {
        startedAt.current = null
        progressRef.current = 0
        useGameStore.getState().finishTransition()
      }
    }

    mat.uniforms.uProgress.value = progressRef.current
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uColorA.value = fromColor
    mat.uniforms.uColorB.value = toColor

    // Position mesh in front of camera, fullscreen
    mesh.position.copy(state.camera.position)
    mesh.position.add(state.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(2))
    mesh.quaternion.copy(state.camera.quaternion)

    // Scale to cover view (orthographic — use a generous size)
    mesh.scale.set(120, 70, 1)

    // visibility toggle
    mesh.visible = progressRef.current > 0.0001
  })

  return (
    <mesh ref={meshRef} renderOrder={999} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        depthTest={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color('#000') },
          uColorB: { value: new THREE.Color('#fff') },
        }}
      />
    </mesh>
  )
}
