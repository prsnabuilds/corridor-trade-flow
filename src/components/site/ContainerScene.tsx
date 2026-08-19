import { Suspense, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, AdaptiveDpr } from "@react-three/drei";
import type { Group } from "three";
import modelUrl from "@/assets/cargo-container.glb?url";

useGLTF.preload(modelUrl);

function Container({ progress }: { progress: RefObject<number> }) {
  const group = useRef<Group>(null);
  const current = useRef(0);
  const { scene } = useGLTF(modelUrl);

  useFrame((state, delta) => {
    const target = (progress.current ?? 0) * Math.PI * 2;
    // eased follow: smooth scrub in both directions
    current.current += (target - current.current) * Math.min(1, delta * 4.5);
    const g = group.current;
    if (!g) return;
    g.rotation.y = -0.6 + current.current;
    g.rotation.x = 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function ContainerScene({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 1.1, 6.4], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#0a0a0a" />
      <directionalLight position={[4, 6, 5]} intensity={2.1} />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} />
      <pointLight position={[-3, 1.5, 3]} intensity={18} distance={14} color="#C4D82E" />
      <Suspense fallback={null}>
        <group scale={2.1}>
          <Container progress={progress} />
        </group>
      </Suspense>
    </Canvas>
  );
}
