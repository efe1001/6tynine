import React, { useEffect } from "react";
import Promoted from "./components/Promoted";
import AdSection from "./components/ad-section";
import Slider from "../components/components/Slider";
import AdSlider from "./components/ad-slider";
// PAKAGES IMPORTS
import ReactGA from "react-ga";
import AllEscorts from "./components/all-escorts";

const HomePage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <Slider />

      <AdSection />

      <a href="https://api.whatsapp.com/send?phone=2348119562376">
        <AdSlider />
      </a>
      <div>
        <Promoted />
      </div>

      <div>
        <AllEscorts />
      </div>
    </>
  );
};

export default HomePage;
