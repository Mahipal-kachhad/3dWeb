import {
  useRef,
  type JSX,
} from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

export type AuraCircleHandle = {
  timeline: gsap.core.Timeline;
};

export const AuraCircle = ((props: JSX.IntrinsicElements["group"]) => {
  const burstRef = useRef<THREE.Mesh>(null!);
  const circleRef = useRef<THREE.Mesh>(null!);

  const circleTexture = useLoader(
    THREE.TextureLoader,
    "/earth/whiteCircle.png"
  );
  const burstTexture = useLoader(THREE.TextureLoader, "/earth/Rays.png");


  useFrame((_state, delta) => {
    if (burstRef.current) {
      burstRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group {...props}>
      <mesh ref={burstRef} scale={0} position={[0, 0.32, -0.19]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={burstTexture}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0}
          color={"#E69E08"}
        />
      </mesh>
      <mesh ref={circleRef} position={[0, 0.37, -0.2]} scale={0}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial
          map={circleTexture}
          transparent={true}
          
          opacity={0}
          color={"#E69E08"}
        />
      </mesh>
    </group>
  );
});


