import { useGLTF } from "@react-three/drei";
import { JSX } from "react";
import { Mesh } from "three";

const Background = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/back.glb");
  scene.traverse((child) => {
    if (child instanceof Mesh && child.material) {
      child.material.transparent = true;
      child.material.needsUpdate = true;
    }
  });
  return <primitive object={scene} {...props} />;
};

export default Background;
