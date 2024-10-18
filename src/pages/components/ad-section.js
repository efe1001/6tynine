import React from "react";

import QuickSearch from "../../components/QuickSearch";
import { Alert, ChatIcon, Button } from "evergreen-ui";

import FB from "../../images/facebook_circle_color-512.webp";
import TW from "../../images/free-twitter-logo-icon-2429-thumb.png";
import IG from "../../images/Instagram_icon.png.webp";
import WT from "../../images/WhatsApp_icon (1).png";
import GM from "../../images/Gmail_Logo_512px.png";

export default function AdSection() {
  return (
    <div>
      <div className="warning">
        <Alert intent="warning" title="DEAR CLIENTS - PLEASE TAKE NOTE">
          Our esteemed gentleman, owing to fraudsters making a runner after
          service, escorts now demand tribute before service. No exception
        </Alert>
      </div>

      <div className="socials-container">
        <div align="center">
          <a href="https://m.facebook.com/6tynine-105995808942527/">
            <img src={FB} className="logo-socials" alt="logo-socials" />
          </a>
        </div>
        <div align="center">
          <a href="https://twitter.com/official6tynine?t=LD35LBZCODGCFHBaNq_ASA&s=09">
            <img src={TW} className="logo-socials" alt="logo-socials" />
          </a>
        </div>
        <div align="center">
          <a href="https://www.instagram.com/6tynine_com.com/">
            <img src={IG} className="logo-socials" alt="logo-socials" />
          </a>
        </div>
        <div align="center">
          <a href="https://api.whatsapp.com/send?phone=2348119562376">
            <img src={WT} className="logo-socials" alt="logo-socials" />
          </a>
        </div>
        <div align="center">
          <a href="mailto:6tynineinfo@gmail.com">
            <img src={GM} className="logo-socials" alt="logo-socials" />
          </a>
        </div>
      </div>

    </div>
  );
}
