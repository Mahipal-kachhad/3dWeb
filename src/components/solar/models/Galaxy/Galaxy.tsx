import { useGLTF } from "@react-three/drei";
import { useEffect, type JSX } from "react";
import * as THREE from "three";
import createTexture from "./createTexture";

const Galaxy = (props: JSX.IntrinsicElements["mesh"]) => {
  const { scene } = useGLTF("/earth/galaxy.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Points) {
        const geometry = object.geometry as THREE.BufferGeometry;
        const colors = geometry.getAttribute("color") as THREE.BufferAttribute;

        if (colors) {
          const color = new THREE.Color();
          for (let i = 0; i < colors.count; i++) {
            color.setRGB(colors.getX(i), colors.getY(i), colors.getZ(i));
            color.offsetHSL(0.0005, 0.005, -0.1);
            colors.setXYZ(i, color.r, color.g, color.b);
          }
          colors.needsUpdate = true;
        }

        const material = object.material as THREE.PointsMaterial;
        material.map = createTexture();
        material.vertexColors = true;
        material.transparent = true;
        material.alphaTest= 0.09;
        material.depthWrite = true;
        material.depthTest = true;
        material.size = 0.0024;
        material.sizeAttenuation = true;
        material.blending = THREE.NormalBlending;
        material.needsUpdate = true;
      }
    });
  }, [scene]);

  const tilt = (0 * Math.PI) / 180;

  return (
    <group rotation-x={tilt}>
      <primitive object={scene} {...props} />
    </group>
  );
};

export default Galaxy;
