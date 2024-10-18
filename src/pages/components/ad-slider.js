import React, { useEffect, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import IMG1 from "../../images/adverts/WhatsApp Image 2023-02-07 at 3.13.27 PM.jpeg";
import IMG2 from "../../images/adverts/WhatsApp Image 2023-02-07 at 3.13.28 PM.jpeg";
import IMG3 from "../../images/adverts/WhatsApp Image 2023-02-07 at 3.13.29 PM.jpeg";

const AdSlider = (props) => {
  return (
    <>
      <div
        style={{
          margin: "5px",
          backgroundColor: "hsl(252, 30%, 17%)",
        }}
      >
        <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
          <div>
            <img src={IMG1} alt="advert" />
          </div>
          <div>
            <img src={IMG2} alt="advert" />
          </div>
          <div>
            <img src={IMG3} alt="advert" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default AdSlider;
