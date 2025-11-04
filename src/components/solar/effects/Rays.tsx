import { useLoader } from "@react-three/fiber";
import { JSX, useMemo } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

const Rays = (props: JSX.IntrinsicElements["mesh"]) => {
  const nebulaTexture = useLoader(TextureLoader, "/earth/rays5.png");

  useMemo(() => {
    nebulaTexture.colorSpace = THREE.SRGBColorSpace;
    nebulaTexture.wrapS = THREE.ClampToEdgeWrapping;
    nebulaTexture.wrapT = THREE.ClampToEdgeWrapping;
    nebulaTexture.minFilter = THREE.LinearFilter;
    nebulaTexture.magFilter = THREE.LinearFilter;
    nebulaTexture.generateMipmaps = true;
  }, [nebulaTexture]);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 4.21);
    geo.translate(0, -4.21 / 2, 0);
    return geo;
  }, []);

  return (
    <mesh {...props} geometry={geometry}>
      <meshBasicMaterial
        map={nebulaTexture}
        color={"orange"}
        transparent={true}
        opacity={0}
        toneMapped={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Rays;
