'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Two-tone particle field — orange + navy clouds (Atya brand)
function StarField({ count, color, seed }: { count: number; color: string; seed: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18 + seed * 0.3
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return pos
  }, [count, seed])

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.rotation.x = t * 0.03 + seed * 0.5
      ref.current.rotation.y = t * 0.05
      ref.current.position.x = Math.sin(t * 0.06 + seed) * 0.3
      ref.current.position.z = Math.cos(t * 0.04 + seed) * 0.2
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  )
}

function FloatingRing({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.2, 0.025, 8, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.13, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

function Grid() {
  const ref = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.5) % 2
    }
  })

  return (
    <gridHelper
      ref={ref}
      args={[40, 40, '#E6E2DA', '#F0EBE0']}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export default function Scene3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '50px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.25]}
        frameloop={active ? 'always' : 'never'}
        style={{ background: 'transparent' }}
      >
        <StarField count={200} color="#F26B1F" seed={0} />
        <StarField count={150} color="#1A2D44" seed={1} />
        <FloatingRing position={[-2.5, 1, -2]} color="#F26B1F" speed={0.3} />
        <FloatingRing position={[2.5, -1, -3]} color="#1A2D44" speed={0.2} />
        <FloatingRing position={[0, 2, -4]} color="#F4B400" speed={0.15} />
        <FloatingSphere position={[-1.8, 0, 0]} color="#F26B1F" />
        <FloatingSphere position={[1.8, 1, -1]} color="#1A2D44" />
        <FloatingSphere position={[-0.8, -1.8, -1]} color="#F4B400" />
        <Grid />
      </Canvas>
    </div>
  )
}
