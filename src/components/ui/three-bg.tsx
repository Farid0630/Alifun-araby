"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Particle Field ── */
function Particles({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#38bdf8"), // sky-400
      new THREE.Color("#7dd3fc"), // sky-300
      new THREE.Color("#0ea5e9"), // sky-500
      new THREE.Color("#a5b4fc"), // indigo-300
      new THREE.Color("#818cf8"), // indigo-400
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.03;
      ref.current.rotation.x += dt * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

/* ── Wireframe Icosahedron ── */
function WireIcosa({
  position, scale = 1, speedX = 0.08, speedY = 0.12, color = "#0ea5e9",
}: {
  position: [number, number, number];
  scale?: number;
  speedX?: number;
  speedY?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * speedX;
    ref.current.rotation.y += dt * speedY;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.14} />
    </mesh>
  );
}

/* ── Wireframe Torus ── */
function WireTorus({
  position, scale = 1, speedX = 0.15, speedZ = 0.08, color = "#7dd3fc",
}: {
  position: [number, number, number];
  scale?: number;
  speedX?: number;
  speedZ?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * speedX;
    ref.current.rotation.z += dt * speedZ;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.05, 16, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </mesh>
  );
}

/* ── Wireframe Octahedron ── */
function WireOcta({
  position, scale = 1, speed = 0.1, color = "#818cf8",
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * speed;
    ref.current.rotation.y += dt * speed * 0.7;
    ref.current.rotation.z += dt * speed * 0.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.16} />
    </mesh>
  );
}

/* ── Connection Lines between particles ── */
function ConnectionLines({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < count; i++) {
      const ax = (Math.random() - 0.5) * 14;
      const ay = (Math.random() - 0.5) * 10;
      const az = (Math.random() - 0.5) * 8;
      const bx = ax + (Math.random() - 0.5) * 3;
      const by = ay + (Math.random() - 0.5) * 3;
      const bz = az + (Math.random() - 0.5) * 3;
      pts.push(ax, ay, az, bx, by, bz);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.04;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.08} />
    </lineSegments>
  );
}

/* ── Glowing Ring ── */
function GlowRing({
  position, radius = 2, speed = 0.2, color = "#0ea5e9",
}: {
  position: [number, number, number];
  radius?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.02, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

/* ── Mouse Parallax Camera ── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Full Scene ── */
function Scene() {
  return (
    <>
      <CameraRig />
      <Particles count={200} />
      <ConnectionLines count={80} />

      {/* Icosahedra */}
      <WireIcosa position={[4,  1.5, -4]} scale={1.8} speedX={0.07} speedY={0.11} color="#0ea5e9" />
      <WireIcosa position={[-5, -1,  -5]} scale={1.4} speedX={0.05} speedY={0.09} color="#7dd3fc" />
      <WireIcosa position={[1,  3,   -6]} scale={1.0} speedX={0.12} speedY={0.07} color="#38bdf8" />

      {/* Octahedra */}
      <WireOcta position={[-3, 2,  -3]} scale={1.2} speed={0.09} color="#818cf8" />
      <WireOcta position={[5, -2,  -4]} scale={0.9} speed={0.13} color="#a5b4fc" />
      <WireOcta position={[-1, -3, -5]} scale={1.5} speed={0.06} color="#6366f1" />

      {/* Tori */}
      <WireTorus position={[0,   0,  -5]} scale={2.5} speedX={0.08} speedZ={0.05} color="#0ea5e9" />
      <WireTorus position={[-4, -2,  -4]} scale={1.8} speedX={0.15} speedZ={0.09} color="#38bdf8" />
      <WireTorus position={[3,  2.5, -6]} scale={1.4} speedX={0.12} speedZ={0.07} color="#7dd3fc" />

      {/* Glow rings */}
      <GlowRing position={[0,   0,  -3]} radius={3.5} speed={0.15} color="#0ea5e9" />
      <GlowRing position={[-2,  1,  -5]} radius={2.2} speed={0.25} color="#818cf8" />
      <GlowRing position={[2,  -1,  -4]} radius={1.8} speed={0.20} color="#38bdf8" />
    </>
  );
}

/* ── Exported Component (lazy-safe) ── */
export function ThreeBg({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 65 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
