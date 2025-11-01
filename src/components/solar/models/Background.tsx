import { useGLTF } from "@react-three/drei";
import { JSX } from "react";

const Background = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/back.glb");
  return <primitive object={scene} {...props} />;
};

export default Background;
