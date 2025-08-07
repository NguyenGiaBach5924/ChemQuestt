// ThreeAtom.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "../App.css";
import { div } from "three/tsl";

// Static proton/neutron particle
const Particle = ({ position, color, size = 0.4, emissive }) => (
  <mesh position={position} castShadow receiveShadow>
    <sphereGeometry args={[size, 32, 32]} />
    <meshStandardMaterial
      color={color}
      metalness={1}
      roughness={0.2}
      emissive={emissive || color}
      emissiveIntensity={2}
    />
  </mesh>
);

// Electron with orbital animation
const OrbitingElectron = ({ radius, speed, offset }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    ref.current.position.set(x, 0, z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="white"
      metalness={1}
      roughness={0.2}
      emissive={"black"}
      emissiveIntensity={0.5} />
    </mesh>
  );
};

// Orbit Ring (dashed circle)
const OrbitRing = ({ radius }) => {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * 2 * Math.PI;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineDashedMaterial attach="material" color="black" dashSize={0.1} gapSize={0.1} />
    </line>
  );
};

const AtomModel = () => {
  const protonPositions = [
    [-0.2, 0, 0.2],
    [0.2, 0, 0.2],
    [0.2, 0.2, 0],
    [-0.2, 0, 0],
  ];
  const neutronPositions = [
    [-0.2, -0.2, 0],
    [-0.2, 0.2, 0],
    [0.2, -0.2, 0],
    [0, 0.2, 0.2],
  ];

  const TiltedOrbitGroup = ({ radius, speed, offsets = [], rotation = [0, 0, 0] }) => (
    <group rotation={rotation}>
      <OrbitRing radius={radius} />
      {offsets.map((offset, i) => (
        <OrbitingElectron
          key={i}
          radius={radius}
          speed={speed}
          offset={offset}
        />
      ))}
    </group>
  );

  return (
    <Canvas style={{ height: "600px", width: "800px", left: "400%", top: "50%"  }} shadows>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[3, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        intensity={2}
        distance={20}
        decay={1}
      />
      <pointLight
        position={[-5, 5, 5]}
        intensity={1.5}
        distance={20}
        decay={1}
      />
      <OrbitControls />

      {/* Nucleus */}
      {protonPositions.map((pos, i) => (
        <Particle
          key={`p-${i}`}
          position={pos}
          color="white"
          emissive={"blue"}
        />
      ))}
      {neutronPositions.map((pos, i) => (
        <Particle
          key={`n-${i}`}
          position={pos}
          color="white"
          emissive={"red"}
        />
      ))}

      {/* Tilted Orbit Rings */}
      <TiltedOrbitGroup
        radius={3}
        speed={1}
        offsets={[0, Math.PI]}
        rotation={[0.1, 0, 3*Math.PI /4]} // Tilted sideways
      />
      <TiltedOrbitGroup
        radius={3}
        speed={0.7}
        offsets={[Math.PI / 2, (3 * Math.PI) / 2]}
        rotation={[0.1, 0, Math.PI / 4]} // Tilted sideways
      />
      <TiltedOrbitGroup
        radius={3}
        speed={0.5}
        offsets={[Math.PI / 3, Math.PI, (5 * Math.PI) / 3]}
        rotation={[0.1,Math.PI/4,0]} // Slight diagonal tilt
      />
    </Canvas>
  );
};

export default AtomModel;
