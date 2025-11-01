import { useLoader } from "@react-three/fiber";
import { JSX, useMemo } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const Rays3 = (props: JSX.IntrinsicElements["mesh"]) => {
  const nebulaTexture = useLoader(TextureLoader, "/earth/rays3.png");

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
      <planeGeometry args={[2.1, 1]} />
      <meshBasicMaterial
        map={nebulaTexture}
        color={"orange"}
        opacity={0}
        transparent={true}
        toneMapped={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Rays3;
