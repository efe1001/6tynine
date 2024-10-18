import NavigationBottom from "./components/NavigationBottom";
import { Link } from "react-router-dom";

import logo from "../images/6tynine/1.png";

import "./components/Navbar.css";

import { IconButton, SearchIcon } from "evergreen-ui";

const NavBar = (props) => {
  return (
    <>



      {/* <Navigation /> */}
      <div className="nav-bar-bk">
        <Link to="/">
          <div className="nav-bar">
            <div className="nav-bar-logo" align="center">
              <img src={logo} alt="6tynine" />
            </div>
          </div>
        </Link>

        <NavigationBottom onOpen={props.onOpen} onOOpen={props.onOOpen} />
      </div>
    </>
  );
};

export default NavBar;
