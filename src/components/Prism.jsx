import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text } from '@react-three/drei';

const Prism = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Add subtle mouse follow effect
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          anisotropicBlur={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.4}
          color="#ffffff"
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
        />
      </mesh>
    </>
  );
};

export default Prism;
