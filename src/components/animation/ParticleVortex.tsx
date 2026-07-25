'use client'

import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { prefersReducedMotion } from '@/lib/motion'

const PARTICLE_COUNT = 2400
const SIGNAL = new THREE.Color('#9F67F5')

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const [positions, initialPositions, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const init = new Float32Array(PARTICLE_COUNT * 3)
    const sz = new Float32Array(PARTICLE_COUNT)
    const width = viewport.width * 1.6
    const height = viewport.height * 1.6
    const depth = 12

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      const x = (Math.random() - 0.5) * width
      const y = (Math.random() - 0.5) * height
      const z = (Math.random() - 0.5) * depth
      pos[ix] = init[ix] = x
      pos[ix + 1] = init[ix + 1] = y
      pos[ix + 2] = init[ix + 2] = z
      sz[i] = Math.random() * 1.8 + 0.6
    }
    return [pos, init, sz]
  }, [viewport])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.x = x * viewport.width * 0.6
      mouseRef.current.y = y * viewport.height * 0.6
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [viewport])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const dt = Math.min(delta, 0.05)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      let x = pos[ix]
      let y = pos[ix + 1]
      let z = pos[ix + 2]
      const ox = initialPositions[ix]
      const oy = initialPositions[ix + 1]
      const oz = initialPositions[ix + 2]

      // Gentle ambient drift
      const driftX = Math.sin(t * 0.2 + oy * 0.5) * 0.02 + Math.cos(t * 0.13 + oz) * 0.015
      const driftY = Math.cos(t * 0.17 + ox * 0.4) * 0.02 + Math.sin(t * 0.11 + oz) * 0.015

      // Cursor attraction (3D)
      const dx = mx - x
      const dy = my - y
      const dz = -4 - z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      const pull = dist > 0.1 ? (80 / (dist * dist + 40)) * dt * 2.5 : 0

      // Spring back to origin + drift
      const homeX = (ox - x) * 0.12 * dt * 2
      const homeY = (oy - y) * 0.12 * dt * 2
      const homeZ = (oz - z) * 0.08 * dt * 2

      x += dx * pull + driftX + homeX
      y += dy * pull + driftY + homeY
      z += dz * pull * 0.5 + homeZ

      pos[ix] = x
      pos[ix + 1] = y
      pos[ix + 2] = z
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        color={SIGNAL}
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function DepthFog() {
  const fogRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!fogRef.current) return
    const t = state.clock.elapsedTime
    fogRef.current.rotation.z = t * 0.02
    const mat = fogRef.current.material as THREE.MeshBasicMaterial
    if (mat.opacity !== undefined) {
      mat.opacity = 0.35 + Math.sin(t * 0.3) * 0.05
    }
  })

  return (
    <mesh ref={fogRef} position={[0, 0, -8]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3, 32, 32]} />
      <meshBasicMaterial
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        color={SIGNAL}
      />
    </mesh>
  )
}

export function ParticleVortex() {
  const reduced = typeof window !== 'undefined' ? prefersReducedMotion() : false
  if (reduced) return null

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0} />
        <ParticleField />
        <DepthFog />
      </Canvas>
    </div>
  )
}
