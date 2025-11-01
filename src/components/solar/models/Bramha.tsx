import { useGLTF } from "@react-three/drei";
import { JSX, useEffect } from "react";
import * as THREE from "three";

const Bramha = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/bramha.glb");
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.metalness = 0.1;
        child.material.roughness = 0.7;
        child.material.transparent = true;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
};

export default Bramha;
