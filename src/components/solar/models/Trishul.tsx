import { useGLTF } from "@react-three/drei";
import { JSX, useEffect } from "react";
import * as THREE from "three";

const Trishul = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/trishul.glb");
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.metalness = 0.1;
        material.roughness = 0.7;
        material.transparent = true;
        material.opacity = 0;
        material.emissiveIntensity = 0.4;
        material.emissive.set("orange");
        material.color.set("orange");
        material.needsUpdate = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
};

export default Trishul;
