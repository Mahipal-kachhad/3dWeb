import { useGLTF } from "@react-three/drei";
import { JSX } from "react";

const Saturn = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/saturn.glb");
  return <primitive object={scene} {...props} />;
};

export default Saturn;
