import { JSX, useLayoutEffect, useRef } from "react";
import { Mesh } from "three";

export const Glow_Layer = 1;

const Son = (props: JSX.IntrinsicElements["mesh"]) => {
  const meshRef = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.layers.enable(Glow_Layer);
      meshRef.current.layers.enable(1);
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial
        color={"orange"}
        emissiveIntensity={9}
        emissive={"orange"}
      />
    </mesh>
  );
};

export default Son;
