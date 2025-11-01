import { useGLTF } from "@react-three/drei";
import { JSX, useEffect } from "react";
import * as THREE from "three";

const Earth = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/earth.glb");
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.emissive = new THREE.Color(0x222233);
        child.material.emissiveIntensity = 2;
        child.material.roughness = 0.8;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
};

export default Earth;