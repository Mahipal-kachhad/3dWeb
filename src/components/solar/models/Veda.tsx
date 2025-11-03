import { useGLTF } from "@react-three/drei";
import { JSX, useEffect } from "react";
import * as THREE from "three";

const Veda = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/ved.gltf");
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.metalness = 0.1;
        material.roughness = 0.7;
        material.transparent = true;
        material.opacity = 0;
        material.emissive.set("orange");
        material.emissiveIntensity = 0.4;
        material.color.set("orange");
        material.needsUpdate = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
};

export default Veda;
