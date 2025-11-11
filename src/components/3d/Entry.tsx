"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "./3dcomponents/Experience";
import { Loader } from "./3dcomponents/Loader";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const Entry = () => {
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
          width: window.innerWidth,
          height: window.innerHeight,
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
      <div className="bg-black flex items-center h-screen fixed top-0 left-0 w-screen">
        <div className="w-screen h-screen">
          <Loader />
          <Canvas
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace,
            }}
          >
            <Suspense fallback={null}>
              <Experience scroller={containerRef.current} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div ref={containerRef} id="animation-trigger" className="h-[1000vh]" />
    </>
  );
};

export default Entry;
