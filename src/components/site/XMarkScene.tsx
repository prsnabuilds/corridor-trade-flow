import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/x-mark.gltf";

function XModel({ progress }: { progress: React.MutableRefObject<number> }) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const s = scene.clone(true);
    // Matte lime finish so it never reads as a dark metallic blob.
    s.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C4D82E"),
        metalness: 0.08,
        roughness: 0.34,
      });
    });
    // Normalize to unit size, centered at origin.
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const wrap = new THREE.Group();
    wrap.add(s);
    const max = Math.max(size.x, size.y, size.z) || 1;
    wrap.scale.setScalar(2.2 / max);
    return wrap;
  }, [scene]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current;
    g.rotation.y += delta * 0.4 + p * delta * 6;
    g.rotation.x = p * 0.5;
    const s = 1 + p * p * 2.4;
    g.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

export default function XMarkScene({ progress }: { progress: React.MutableRefObject<number> }) {
  useEffect(() => {
    useGLTF.preload(MODEL_URL);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-5, -2, 3]} intensity={0.9} color="#C4D82E" />
      <Suspense fallback={null}>
        <XModel progress={progress} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
