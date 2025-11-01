import { JSX } from "react";
import { DoubleSide } from "three";

const BlackPlain = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <mesh {...props}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        color={"black"}
        side={DoubleSide}
        opacity={0}
        depthTest={true}
        depthWrite={false}
        transparent={true}
      />
    </mesh>
  );
};

export default BlackPlain;
