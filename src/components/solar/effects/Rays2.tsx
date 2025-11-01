import { useLoader } from "@react-three/fiber";
import { JSX, useMemo } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const Rays2 = (props: JSX.IntrinsicElements["mesh"]) => {
  const nebulaTexture = useLoader(TextureLoader, "/earth/rays2.png");

  useMemo(() => {
    nebulaTexture.colorSpace = THREE.SRGBColorSpace;
    nebulaTexture.wrapS = THREE.ClampToEdgeWrapping;
    nebulaTexture.wrapT = THREE.ClampToEdgeWrapping;
    nebulaTexture.minFilter = THREE.LinearFilter;
    nebulaTexture.magFilter = THREE.LinearFilter;
    nebulaTexture.generateMipmaps = true;
  }, [nebulaTexture]);

  return (
    <mesh {...props}>
      <planeGeometry args={[2.13, 1]} />
      <meshBasicMaterial
        map={nebulaTexture}
        color={"orange"}
        transparent={true}
        opacity={0}
        depthWrite={false}
        toneMapped={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Rays2;
