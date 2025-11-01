import { useGSAP } from "@gsap/react";
import { Camera, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { RefObject, useMemo } from "react";
import {
  AmbientLight,
  DirectionalLight,
  Group,
  Material,
  Mesh,
  PointLight,
  Vector3,
} from "three";
import { VignetteHandle } from "./effects/Vignette";

const useAnimation = (
  camera: Camera,
  earthRef: RefObject<Group>,
  nebulaRef: RefObject<Group>,
  vignetteRef: RefObject<VignetteHandle>,
  plainRef: RefObject<Mesh>,
  AuraRef: RefObject<Group>,
  maaRef: RefObject<Group>,
  bramha: RefObject<Group | Mesh>,
  vishnu: RefObject<Group | Mesh>,
  shiva: RefObject<Group | Mesh>,
  trishul: RefObject<Mesh>,
  chakra: RefObject<Mesh>,
  veda: RefObject<Mesh>,
  groupRef: RefObject<Group>,
  amb1Ref: RefObject<AmbientLight>,
  dir1Ref: RefObject<DirectionalLight>,
  handGlowRef: RefObject<Mesh>,
  p1Ref: RefObject<PointLight>,
  p2Ref: RefObject<PointLight>,
  backRef: RefObject<Mesh>
) => {
  const tl = gsap.timeline({ paused: true });
  camera.layers.enable(4);
  const lookAtTarget = useMemo(() => new Vector3(0, 0, 0), []);

  useGSAP(
    () => {
      const [burst, circle] = AuraRef.current.children as Mesh[];
      const [handGlow] = handGlowRef.current.children as Mesh[];
      const models = [bramha.current, vishnu.current, shiva.current];
      const materials: Material[] = [];
      models.forEach((model) => {
        if (model) {
          model.traverse((child) => {
            if (child instanceof Mesh && child.material) {
              if (!materials.includes(child.material)) {
                materials.push(child.material);
              }
            }
          });
        }
      });
      gsap.set(materials, {
        transparent: false,
        needsUpdate: true,
        depthWrite: true,
        opacity: 0,
      });

      const shakti = [chakra.current, veda.current, trishul.current];
      const shaktiMaterial: Material[] = [];

      shakti.forEach((model) => {
        if (model) {
          model.traverse((child) => {
            if (child instanceof Mesh && child.material) {
              if (!shaktiMaterial.includes(child.material)) {
                shaktiMaterial.push(child.material);
              }
            }
          });
        }
      });

      gsap.set(camera, {
        fov: 30,
        near: 0.003,
        onUpdate: () => camera.updateProjectionMatrix(),
      });
      gsap.set(camera.position, { z: 0.12 });

      tl.to(camera.position, { z: 26.2, ease: "power2.inOut", duration: 4 });
      tl.to(
        groupRef.current.rotation,
        { z: Math.PI * 0.05, duration: 4, ease: "power2.inOut" },
        "<"
      );
      tl.to(
        earthRef.current.rotation,
        {
          y: `+=${Math.PI * 1.5}`,
          duration: 4,
          ease: "power1.inOut",
        },
        "<"
      );
      if (vignetteRef.current?.uniforms) {
        const { vignetteStrength, vignetteShrink } =
          vignetteRef.current.uniforms;

        tl.set(vignetteStrength, { value: 1.0 }, "-=3");
        tl.set(vignetteShrink, { value: 0.0 }, "-=3");

        tl.to(
          vignetteStrength,
          {
            value: 3.0,
            duration: 2,
            ease: "power2.in",
          },
          "-=3"
        );

        tl.to(
          vignetteShrink,
          {
            value: 0.5,
            duration: 2,
            ease: "power2.in",
          },
          "<"
        );

        tl.to(vignetteStrength, {
          value: 10.0,
          duration: 2,
          ease: "power2.in",
        });

        tl.to(
          vignetteShrink,
          {
            value: 1.0,
            duration: 2,
            ease: "power2.in",
          },
          "<"
        );
        tl.to(
          plainRef.current.material,
          { opacity: 1, duration: 1, ease: "power1.in" },
          "-=3"
        );
      }
      tl.set(amb1Ref.current, { intensity: 0 }, "-=2");
      tl.set(dir1Ref.current, { intensity: 0 }, "<");

      tl.set(
        lookAtTarget,
        {
          z: 34,
        },
        "<"
      );

      tl.to(
        circle.scale,
        {
          x: 0.35,
          y: 0.35,
          duration: 2,
          ease: "power2.Out",
        },
        "<"
      ).to(
        circle.material,
        {
          opacity: 1,
          duration: 2,
          ease: "power2.Out",
        },
        "<"
      );

      tl.to(
        burst.scale,
        {
          x: 1.2,
          y: 1.2,
          duration: 2,
          ease: "power2.inOut",
        },
        "-=1.5"
      ).to(
        burst.material,
        {
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(p1Ref.current, {
        intensity: 0.9,
        duration: 1,
        ease: "power1.inOut",
      });
      tl.to(
        p2Ref.current,
        { intensity: 0.4, duration: 1, ease: "power1.inOut" },
        "<"
      );
      tl.to(
        dir1Ref.current,
        { intensity: 0.1, duration: 1, ease: "power1.inOut" },
        "<"
      );
      tl.to(materials, { opacity: 1, duration: 1, ease: "power1.inOut" });
      tl.to(handGlow.material, {
        opacity: 1,
        duration: 1,
        ease: "power1.in",
      });
      tl.set(shaktiMaterial, { opacity: 1, needsUpdate: true });
      tl.to(trishul.current.position, {
        x: -1.2,
        y: -0.7,
        z: 29.9,
        duration: 1.5,
        ease: "power1.inOut",
      });
      tl.to(
        chakra.current.position,
        { x: 1.2, y: -0.7, z: 29.9, duration: 1.5, ease: "power1.inOut" },
        "<"
      );
      tl.to(
        veda.current.position,
        { x: 0, y: -0.7, z: 29.1, duration: 1.5, ease: "power1.inOut" },
        "<"
      );
      tl.to(
        trishul.current.scale,
        { x: 0.23, y: 0.23, z: 0.23, duration: 1.5, ease: "power1.inOut" },
        "<"
      );
      tl.to(
        veda.current.scale,
        { x: 0.21, y: 0.21, z: 0.21, duration: 1.5, ease: "power1.inOut" },
        "<"
      );
      tl.to(
        chakra.current.scale,
        { x: 0.29, y: 0.29, z: 0.29, duration: 1.5, ease: "power1.inOut" },
        "<"
      );
    },
    {
      dependencies: [
        camera,
        earthRef,
        nebulaRef,
        vignetteRef,
        plainRef,
        AuraRef,
        maaRef,
        bramha,
        vishnu,
        shiva,
        trishul,
        chakra,
        veda,
        amb1Ref,
        dir1Ref,
        handGlowRef,
        p1Ref,
        p2Ref,
      ],
    }
  );

  useFrame(() => {
    camera.lookAt(lookAtTarget);
  });

  return tl;
};

export default useAnimation;
