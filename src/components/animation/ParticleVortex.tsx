'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { prefersReducedMotion } from '@/lib/motion'

const SIGNAL = new THREE.Color('#FF5500')
const CREAM = new THREE.Color('#FDFCDC')

// Pre-allocated reusable refs to avoid recreating Float32Array at render time
function useParticleArrays(count: number) {
  const positionsRef = useRef<Float32Array | null>(null)
  const initialRef = useRef<Float32Array | null>(null)
  const sizesRef = useRef<Float32Array | null>(null)
  const colorsRef = useRef<Float32Array | null>(null)

  if (!positionsRef.current) positionsRef.current = new Float32Array(count * 3)
  if (!initialRef.current) initialRef.current = new Float32Array(count * 3)
  if (!sizesRef.current) sizesRef.current = new Float32Array(count)
  if (!colorsRef.current) colorsRef.current = new Float32Array(count * 3)

  return {
    positions: positionsRef.current,
    initialPositions: initialRef.current,
    sizes: sizesRef.current,
    colors: colorsRef.current,
  }
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const { viewport } = useThree()
  const count = 1800
  const { positions, initialPositions, sizes, colors } = useParticleArrays(count)

  useEffect(() => {
    const w = viewport.width * 1.8
    const h = viewport.height * 1.8
    const depth = 18

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const x = (Math.random() - 0.5) * w
      const y = (Math.random() - 0.5) * h
      const z = (Math.random() - 0.5) * depth
      positions[ix] = initialPositions[ix] = x
      positions[ix + 1] = initialPositions[ix + 1] = y
      positions[ix + 2] = initialPositions[ix + 2] = z
      sizes[i] = Math.random() * 2 + 0.5
      const isCream = Math.random() > 0.92
      colors[ix] = isCream ? CREAM.r : SIGNAL.r
      colors[ix + 1] = isCream ? CREAM.g : SIGNAL.g
      colors[ix + 2] = isCream ? CREAM.b : SIGNAL.b
    }
  }, [viewport, count, positions, initialPositions, sizes, colors])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.x = x * viewport.width * 0.7
      mouseRef.current.y = y * viewport.height * 0.7
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [viewport])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const dt = Math.min(delta, 0.05)

    // Parallax depth: slow drift tied to global scroll
    const scrollShift = scrollRef.current * 6

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      let x = pos[ix]
      let y = pos[ix + 1]
      let z = pos[ix + 2]
      const ox = initialPositions[ix]
      const oy = initialPositions[ix + 1]
      const oz = initialPositions[ix + 2]

      // Depth parallax: farther particles (larger z) move slower
      const depthFactor = 1 - Math.abs(oz) / 20
      const driftX = Math.sin(t * 0.12 + oy * 0.4) * 0.04 * depthFactor + Math.cos(t * 0.08 + oz) * 0.03
      const driftY = Math.cos(t * 0.1 + ox * 0.35) * 0.04 * depthFactor + Math.sin(t * 0.06 + oz) * 0.03

      // Cursor attraction (3D)
      const dx = mx - x
      const dy = my - y
      const dz = -5 - z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      const pull = dist > 0.1 ? (120 / (dist * dist + 60)) * dt * 3 : 0

      // Spring home + parallax scroll shift
      const homeX = (ox - x) * 0.1 * dt * 2
      const homeY = (oy - y + scrollShift * (1 - depthFactor) * 20) * 0.1 * dt * 2
      const homeZ = (oz - z) * 0.06 * dt * 2

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
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={1.1}
        vertexColors
        transparent
        opacity={0.8}
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
    fogRef.current.rotation.z = t * 0.015
    const mat = fogRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.3 + Math.sin(t * 0.25) * 0.04
  })

  return (
    <mesh ref={fogRef} position={[0, 0, -10]}>
      <planeGeometry args={[viewport.width * 3.5, viewport.height * 3.5, 32, 32]} />
      <meshBasicMaterial
        transparent
        opacity={0.3}
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
        camera={{ position: [0, 0, 12], fov: 60 }}
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
