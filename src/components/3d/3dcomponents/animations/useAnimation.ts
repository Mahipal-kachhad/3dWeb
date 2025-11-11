import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type Camera } from "@react-three/fiber";

export const useAnimation = (
  camera: Camera,
) => {
  const tl = gsap.timeline({ paused: true });

  useGSAP(
    () => {
      gsap.set(camera.position, { x: 0, y: 0, z: 14 });
      gsap.set(camera, {
        fov: 120,
        near: 0.02,
        onUpdate: () => camera.updateProjectionMatrix(),
      });
      tl.to(camera.position, {
        z: 6.4,
        duration: 5.5,
        ease: "power1.Out",
      });
    },
    { dependencies: [camera] }
  );
  
  return tl;
};
