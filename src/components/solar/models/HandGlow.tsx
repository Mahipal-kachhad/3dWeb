import { useRef, type JSX } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

const HandGlow = (props: JSX.IntrinsicElements["group"]) => {
  const burstRef = useRef<THREE.Mesh>(null!);
  const burstTexture = useLoader(THREE.TextureLoader, "/earth/Rays.png");

  useFrame((_state, delta) => {
    if (burstRef.current) {
      burstRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group {...props}>
      <mesh ref={burstRef} >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={burstTexture}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0}
          color={"orange"}
        />
      </mesh>
    </group>
  );
};

export default HandGlow;
