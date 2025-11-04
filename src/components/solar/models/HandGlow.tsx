import { useRef, type JSX } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

const HandGlow = (props: JSX.IntrinsicElements["group"]) => {
  const burstTexture = useLoader(THREE.TextureLoader, "/earth/handGlow.png");

  return (
    <group {...props}>
      <mesh>
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
