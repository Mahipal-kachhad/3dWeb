import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import Scene from "./Scene";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Loader } from "./models/Loader";

gsap.registerPlugin(ScrollTrigger);
const System = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          containerRef.current.scrollTop = value;
        }
        return containerRef.current.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          height: window.innerHeight,
          width: window.innerWidth,
        };
      },
      pinType: "fixed",
    });
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="h-screen w-screen fixed bg-[#000000]">
        <Loader />
        <Canvas
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <Suspense fallback={<mesh></mesh>}>
            <Scene scroller={containerRef.current} />
          </Suspense>
        </Canvas>
      </div>
      <div className="h-[1500vh]" ref={containerRef} id="an-trigger" />
    </>
  );
};

export default System;
