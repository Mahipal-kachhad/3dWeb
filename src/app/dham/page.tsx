"use client";
import AboutMVTY from "@/components/AboutMVTY";
import BlurSlider from "@/components/BlurSlider";
import Contact from "@/components/Contact";
import Darshan from "@/components/Darshan";
import Dham2 from "@/components/dham/Dham2";
import DhamInfo from "@/components/dham/DhamInfo";
import VideoModel from "@/components/dham/VideoModel";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import GlimpsOfMaa from "@/components/maaVishvambhari/GlimpsOfMaa";
import MaaVishvambhari from "@/components/maaVishvambhari/MaaVishvambhari";
import Map from "@/components/Map";
import Pillars from "@/components/pillars/Pillars";
import Quotes from "@/components/quotes/Quotes";
import SreeVitthalbhai from "@/components/sreeVitthalbhai/SreeVitthalbhai";
import VitthalbhaiBio from "@/components/sreeVitthalbhai/VitthalbhaiBio";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function SecondPage() {
  const router = useRouter();
  const hasNavigatedBack = useRef(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "100px top",
        onEnter: () => setHasScrolledDown(true),
      });
      ScrollTrigger.create({
        trigger: "#top-trigger",
        start: "top top",
        end: "bottom top",
        onEnterBack: () => {
          if (!hasNavigatedBack.current && hasScrolledDown) {
            hasNavigatedBack.current = true;

            setTimeout(() => {
              router.push("/");
            }, 300);
          }
        },
        onLeave: () => {
          hasNavigatedBack.current = false;
        },
      });
    },
    { dependencies: [hasScrolledDown] }
  );
  return (
    <div className="bg-[#1D1D1F] min-h-screen">
      <div
        id="top-trigger"
        style={{ height: "1px", position: "absolute", top: 0 }}
      />
      <AboutMVTY />
      <MaaVishvambhari />
      <GlimpsOfMaa />
      <SreeVitthalbhai />
      <VitthalbhaiBio />
      <VideoModel />
      <DhamInfo />
      <Dham2 />
      <Pillars />
      <BlurSlider />
      <Events />
      <Quotes />
      <Darshan />
      <Map />
      <Contact />
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
