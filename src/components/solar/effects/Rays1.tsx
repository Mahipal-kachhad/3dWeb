import { useLoader } from "@react-three/fiber";
import { JSX, useMemo } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const Rays1 = (props: JSX.IntrinsicElements["mesh"]) => {
  const nebulaTexture = useLoader(TextureLoader, "/earth/rays1.png");

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
      <planeGeometry args={[1, 2.667]} />
      <meshBasicMaterial
        map={nebulaTexture}
        color={'orange'}
        transparent={true}
        opacity={0}
        toneMapped={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Rays1;
