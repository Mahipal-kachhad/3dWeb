import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";

const Maa = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/maa.glb");
  return <primitive {...props} object={scene} />;
};

export default Maa;
