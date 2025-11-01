import { useGLTF } from "@react-three/drei";
import { JSX } from "react";

const Moon = (props:JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/moon.glb");

  return <primitive object={scene} {...props} />;
};

export default Moon;
