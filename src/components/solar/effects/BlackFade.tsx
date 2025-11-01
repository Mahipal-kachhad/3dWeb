import { useLoader } from "@react-three/fiber";
import { JSX, useMemo } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const BlackFade = (props: JSX.IntrinsicElements["mesh"]) => {
  const nebulaTexture = useLoader(TextureLoader, "/earth/blackFade.png");

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
      <planeGeometry args={[1.688, 1]} />
      <meshBasicMaterial
        map={nebulaTexture}
        transparent={true}
        toneMapped={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default BlackFade;
