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
  moonRef: RefObject<Mesh>,
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
  p3Ref: RefObject<PointLight>,
  rays1Ref: RefObject<Mesh>,
  rays2Ref: RefObject<Mesh>,
  rays3Ref: RefObject<Mesh>,
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

      const backMaterial: Material[] = [];
      const back = [backRef.current];

      back.forEach((model) => {
        if (model) {
          model.traverse((child) => {
            if (child instanceof Mesh && child.material) {
              if (!backMaterial.includes(child.material)) {
                backMaterial.push(child.material);
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

      tl.to(camera.position, { z: 26.2, ease: "power2.in", duration: 4 });
      tl.to(
        groupRef.current.rotation,
        { z: Math.PI * 0.05, duration: 4, ease: "power2.in" },
        "<"
      );
      tl.to(
        earthRef.current.rotation,
        {
          y: `+=${Math.PI * 1.5}`,
          duration: 4,
          ease: "power1.in",
        },
        "<"
      );
      tl.to(
        moonRef.current.rotation,
        {
          y: `+=${Math.PI * 1}`,
          duration: 4,
          ease: "power1.in",
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
      tl.set(backMaterial, { opacity: 0 }, "<");
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
          duration: 1,
          ease: "power2.Out",
        },
        "<"
      ).to(
        circle.material,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.Out",
        },
        "<"
      );

      tl.to(
        burst.scale,
        {
          x: 1.2,
          y: 1.2,
          duration: 1.5,
          ease: "power2.Out",
        },
        "-=1.5"
      ).to(
        burst.material,
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.Out",
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
        p3Ref.current,
        { intensity: 0.07, ease: "power1.inOut", duration: 1 },
        "<"
      );
      tl.to(
        dir1Ref.current,
        { intensity: 0.1, duration: 1, ease: "power1.inOut" },
        "<"
      );
      tl.to(materials, { opacity: 1, duration: 0.5, ease: "power1.inOut" });
      tl.to(handGlow.material, {
        opacity: 1,
        duration: 1,
        ease: "power1.in",
      });
      tl.to(
        [
          rays1Ref.current.material,
          rays2Ref.current.material,
          rays3Ref.current.material,
        ],
        { opacity: 1, duration: 1, ease: "power1.inOut" },
        "<"
      );
      tl.to(
        rays1Ref.current.scale,
        {
          x: 0.43,
          y: 0.43,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
      tl.to(
        rays2Ref.current.scale,
        {
          x: 0.43,
          y: 0.43,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
      tl.to(
        rays3Ref.current.scale,
        {
          x: 0.53,
          y: 0.53,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
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
      tl.to(
        [
          rays1Ref.current.material,
          rays2Ref.current.material,
          rays3Ref.current.material,
          handGlow.material,
        ],
        { opacity: 0, duration: 0.3, ease: "power1.in" }
      );
      tl.to([p1Ref.current, p2Ref.current, p3Ref.current, dir1Ref.current], {
        intensity: 0,
        duration: 1,
        ease: "power1.in",
      });

      tl.to(
        [burst.material, circle.material, handGlow.material],
        { opacity: 0, duration: 1, ease: "power1.in" },
        "<"
      );
      tl.to(
        shaktiMaterial,
        { emissiveIntensity: 0, duration: 1, ease: "power1.in" },
        "<"
      );
    },
    {
      dependencies: [
        camera,
        earthRef,
        moonRef,
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
        p3Ref,
        rays1Ref,
        rays2Ref,
        rays3Ref,
        backRef,
      ],
    }
  );

  useFrame(() => {
    camera.lookAt(lookAtTarget);
  });

  return tl;
};

export default useAnimation;
