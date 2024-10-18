import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "responsive-navbar-react";
import LOGO from "../../images/6tynine/1.png";
import "responsive-navbar-react/dist/index.css";

const Navigation = () => {
  const history = useHistory();

  const props = {
    items: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "NewlyPromted",
        link: "/newlypromoted",
      },
      {
        text: "NewlyJoined",
        link: "/newly-joined",
      },
      {
        text: "Contact",
        link: "#contact",
      },
    ],
    logo: LOGO,
    style: {
      barStyles: {
        background: "hsl(252, 30%, 17%)",
      },
      sidebarStyles: {
        background: "#222",
        buttonColor: "white",
      },
    },
  };
  return (
    <Navbar
      {...props}
      onClick={() => {
        history.push("/");
      }}
    />
  );
};

export default Navigation;
