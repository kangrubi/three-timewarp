import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const colors = [
  new THREE.Color(0xffc9fa),
  new THREE.Color(0xe64c92),
  new THREE.Color(0x491869),
];

const Star = () => {
  const mesh = useRef();

  const position = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 20 + Math.random() * 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = -1000 + Math.random() * 1500;
    return [x, y, z];
  }, []);

  const rotation = useMemo(() => {
    return [Math.PI / 2, 0, 0];
  }, []);

  // const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const color = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useFrame(({ clock }) => {
    mesh.current.position.z += 0.5;
    if (mesh.current.position.z > 500) {
      mesh.current.position.z = -1000;
    }
  });

  return (
    <>
      <mesh ref={mesh} position={position} rotation={rotation}>
        <cylinderGeometry args={[0.06, 0.06, 20, 32]} />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
    </>
  );
};

const Stars = () => {
  const stars = useMemo(() => {
    return new Array(400).fill(null);
  }, []);

  return (
    <>
      {stars.map((_, index) => (
        <Star key={index} />
      ))}
    </>
  );
};

export const TimeWarp = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
      }}
      camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 2000 }}
    >
      <Stars />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.01}
          luminanceSmoothing={0.025}
          intensity={1.5}
        />
      </EffectComposer>
    </Canvas>
  );
};
