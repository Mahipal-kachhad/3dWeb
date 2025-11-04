import { Toaster } from "react-hot-toast";
import AboutMVTY from "./AboutMVTY";
import BlurSlider from "./BlurSlider";
import Contact from "./Contact";
import Darshan from "./Darshan";
import Dham2 from "./dham/Dham2";
import DhamInfo from "./dham/DhamInfo";
import VideoModel from "./dham/VideoModel";
import Events from "./Events";
import Footer from "./Footer";
import GlimpsOfMaa from "./maaVishvambhari/GlimpsOfMaa";
import MaaVishvambhari from "./maaVishvambhari/MaaVishvambhari";
import Map from "./Map";
import Pillars from "./pillars/Pillars";
import Quotes from "./quotes/Quotes";
import SreeVitthalbhai from "./sreeVitthalbhai/SreeVitthalbhai";
import VitthalbhaiBio from "./sreeVitthalbhai/VitthalbhaiBio";

const SecondPage = () => {
  return (
    <div className="bg-[#1D1D1F] min-h-screen">
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
};

export default SecondPage;
