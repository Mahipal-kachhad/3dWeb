import { useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { gsap, type DOMTarget } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useAnimation } from "./animations/useAnimation";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import Earth from "@/components/solar/models/Earth";
import Jupiter from "@/components/solar/models/Jupiter";
import Saturn from "@/components/solar/models/Saturn";
import Galaxy from "./Galaxy/Galaxy";
import Nebula1 from "@/components/solar/models/Nebula1";
import Nebula2 from "@/components/solar/models/Nebula2";

const Experience = ({ scroller }: { scroller: DOMTarget }) => {
  const galaxyRef = useRef<THREE.Group>(null!);
  const [isBloom, setBloom] = useState<Boolean>(false);

  const { camera } = useThree();

  const animationTl = useAnimation(camera);

  useGSAP(
    () => {
      const masterTl = gsap.timeline();

      masterTl.add(animationTl.play());

      ScrollTrigger.create({
        animation: masterTl,
        trigger: "#animation-trigger",
        scroller: scroller,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      });

      ScrollTrigger.create({
        trigger: "#animation-trigger",
        scroller: scroller,

        start: "0 center",
        end: "100% center",

        onToggle: (self) => setBloom(self.isActive),
      });
    },
    { dependencies: [scroller, animationTl] }
  );

  return (
    <>
      <OrbitControls rotateSpeed={0.1} />
      <ambientLight />
      <group>
        <Galaxy
          ref={galaxyRef}
          position={[-2.9, -2.9, 14]}
          scale={2}
          castShadow={false}
          receiveShadow={false}
        />
      </group>
      <Earth scale={0.0007} position={[0, 0, 9]} />
      <Jupiter position={[-0.4, 0, 8]} scale={0.1} />
      <Saturn position={[0.4, 0, 7]} scale={0.05} rotation={[0.5, 0, 0]} />
      <EffectComposer>
        {isBloom && (
          <EffectComposer resolutionScale={0.5}>
            <Bloom
              luminanceThreshold={0.01}
              intensity={4}
              radius={0.9}
              mipmapBlur
            />
            <BrightnessContrast brightness={0.2} contrast={0.44} />
            <HueSaturation saturation={0.3} />
          </EffectComposer>
        )}
      </EffectComposer>
    </>
  );
};

export default Experience;
