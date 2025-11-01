import { Environment, OrbitControls } from "@react-three/drei";
import Earth from "./models/Earth";
import Moon from "./models/Moon";
import { useThree } from "@react-three/fiber";
import useAnimation from "./useAnimation";
import { useGSAP } from "@gsap/react";
import gsap, { DOMTarget } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import * as THREE from "three";
import Son from "./models/Son";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Vignette, { VignetteHandle } from "./effects/Vignette";
import Stars from "./models/Stars";
import BlackPlain from "./effects/BlackPlain";
import Maa from "./models/Maa/Maa";
import { AuraCircle } from "./models/Maa/MaaAura";
import Nebula1 from "./models/Nebula1";
import Nebula2 from "./models/Nebula2";
import Trishul from "./models/Trishul";
import Chakra from "./models/Chakra";
import Veda from "./models/Veda";
import Shivji from "./models/Shivji";
import Bramha from "./models/Bramha";
import Vishnu from "./models/Vishnu";
import HandGlow from "./models/HandGlow";
import Background from "./models/Background";
import Rays1 from "./effects/Rays1";
import Rays2 from "./effects/Rays2";
import BlackFade from "./effects/BlackFade";
import Rays3 from "./effects/Rays3";

const Scene = ({ scroller }: { scroller: DOMTarget }) => {
  const { camera } = useThree();
  const earthRef = useRef<THREE.Group>(null!);
  const nebulaRef = useRef<THREE.Group>(null!);
  const vignetteRef = useRef<VignetteHandle>(null!);
  const plainRef = useRef<THREE.Mesh>(null!);
  const auraRef = useRef<THREE.Group>(null!);
  const maaRef = useRef<THREE.Group>(null!);
  const trishul = useRef<THREE.Mesh>(null!);
  const chakra = useRef<THREE.Mesh>(null!);
  const veda = useRef<THREE.Mesh>(null!);
  const bramhaRef = useRef<THREE.Mesh>(null!);
  const vishnuRef = useRef<THREE.Mesh>(null!);
  const shivaRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const amb1Ref = useRef<THREE.AmbientLight>(null!);
  const dir1Ref = useRef<THREE.DirectionalLight>(null!);
  const handGlowRef = useRef<THREE.Mesh>(null!);
  const p1Ref = useRef<THREE.PointLight>(null!);
  const p2Ref = useRef<THREE.PointLight>(null!);

  const animationTl = useAnimation(
    camera,
    earthRef,
    nebulaRef,
    vignetteRef,
    plainRef,
    auraRef,
    maaRef,
    bramhaRef,
    vishnuRef,
    shivaRef,
    trishul,
    chakra,
    veda,
    groupRef,
    amb1Ref,
    dir1Ref,
    handGlowRef,
    p1Ref,
    p2Ref
  );

  useGSAP(
    () => {
      const masterTl = gsap.timeline();
      masterTl.add(animationTl.play());

      ScrollTrigger.create({
        scroller,
        animation: masterTl,
        trigger: "an-trigger",
        scrub: 1.5,
        start: "top top",
        end: "bottom bottom",
      });
    },
    { dependencies: [animationTl] }
  );

  return (
    <>
      {/* <OrbitControls /> */}
      {/* <axesHelper args={[40]} /> */}
      <group ref={groupRef}>
        <pointLight
          intensity={5}
          position={[2, 1, -0.4]}
          distance={10}
          decay={0}
        />
        <ambientLight intensity={0.7} ref={amb1Ref} />
        <group ref={earthRef}>
          <Earth scale={0.001} rotation={[0.4, 3.47, 0]} />
        </group>
        <Moon position={[-0.35, -0.15, 2]} scale={0.001} />
        <Son position={[0.5, 0.5, -9]} scale={1.7} />

        <Nebula1 position={[-9, -4, -8]} scale={13} rotation-x={0.1} />
        <Nebula2
          position={[8.3, 0, -8]}
          scale={13}
          rotation-x={Math.PI}
          rotation-y={Math.PI}
        />
        <Stars position={[0, 0, 8]} />
      </group>
      <Vignette ref={vignetteRef} position={[0, 0, 16]} />
      <BlackPlain position={[0, 0, 16.1]} ref={plainRef} />

      <mesh layers={2} ref={maaRef}>
        <BlackFade position={[0, -0.32, 30.7]} scale={0.57} />
        <Maa position={[0, -0.6, 30.7]} scale={0.8} rotation-y={Math.PI} />
        <AuraCircle
          ref={auraRef}
          position={[0, 0.4, 30.6]}
          rotation-y={Math.PI}
        />
      </mesh>

      <directionalLight position={[0, 0, -5]} intensity={0} ref={dir1Ref} />
      <pointLight position={[0, 0, 30]} intensity={0} decay={0.8} ref={p1Ref} />
      <pointLight
        position={[0, 0.55, 30]}
        intensity={0}
        decay={3}
        ref={p2Ref}
      />

      <mesh>
        <Shivji
          ref={shivaRef}
          scale={0.23}
          position={[-1.2, -0.7, 29.9]}
          rotation-y={0.65}
        />
        <Bramha ref={bramhaRef} scale={0.21} position={[0, -0.7, 29.1]} />
        <Vishnu
          ref={vishnuRef}
          scale={0.29}
          position={[1.2, -0.7, 29.9]}
          rotation-y={-0.5}
        />
        <Trishul
          scale={0.03}
          position={[0.15, 0.29, 30.686]}
          rotation-y={0.65}
          ref={trishul}
        />
        <Chakra
          position={[0.24, 0.145, 30.689]}
          scale={0.07}
          ref={chakra}
          rotation-y={-0.5}
        />
        <Veda position={[0.14, 0.26, 30.63]} scale={0.05} ref={veda} />
        <HandGlow
          ref={handGlowRef}
          scale={0.25}
          position={[0.18, 0.35, 30.7]}
          rotation-y={Math.PI}
        />
      </mesh>
      <Rays1
        position={[0.11, 0.11, 30.22]}
        scale={0.4}
        rotation={[1.1, 0, -0.12]}
      />
      <Rays3
        position={[-0.48, -0.02, 30.25]}
        scale={0.75}
        rotation={[0, Math.PI - 0.6, 0]}
      />
      <Rays2
        position={[0.595, 0.09, 30.28]}
        scale={0.57}
        rotation={[0, Math.PI + 0.8, -0.03]}
      />

      {/* <Environment files={"/earth/star.hdr"} background/> */}
      {/* <Background position={[0, 0, 0]} scale={30} /> */}
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={7} radius={0.7} mipmapBlur />
      </EffectComposer> */}
    </>
  );
};

export default Scene;
