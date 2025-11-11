import { useGLTF } from "@react-three/drei";
import { JSX, useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";

const Jupiter = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/jupiter.glb");
  console.log(scene);
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const material = child.material as MeshStandardMaterial;
        material.color.multiplyScalar(0.9);
        material.needsUpdate = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
};

export default Jupiter;
