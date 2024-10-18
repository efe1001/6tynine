import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import "./Navbar.css";
import search from "../../images/9.png";

import {
  SearchIcon,
  NotificationsIcon,
  Button,
  LogOutIcon,
  SettingsIcon,
  CogIcon,
  IconButton,
  LogInIcon,
} from "evergreen-ui";

const NavigationBottom = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <div className="nav-bottom">
        <div>
          <IconButton
            icon={SearchIcon}
            marginRight={5}
            onClick={props.onOOpen}
          />
          <IconButton icon={NotificationsIcon} marginRight={5} />

          {!authCtx.escortLoggedIn && (
            <>
              <Button
                marginRight={7}
                intent="danger"
                iconBefore={CogIcon}
                appearance="primary"
                onClick={() => {
                  history.push("/signup");
                }}
              >
                SIGN UP
              </Button>

              <Button
                marginRight={7}
                intent="success"
                iconBefore={LogInIcon}
                appearance="primary"
                onClick={props.onOpen}
              >
                LOGIN
              </Button>
            </>
          )}

          {authCtx.escortLoggedIn && (
            <Button
              marginRight={7}
              intent="success"
              iconBefore={CogIcon}
              appearance="primary"
              onClick={() => {
                history.push("/settings");
              }}
            >
              PROFILE
            </Button>
          )}

          {authCtx.escortLoggedIn && (
            <Button
              onClick={logoutHandler}
              iconBefore={LogOutIcon}
              marginRight={7}
              intent="danger"
              appearance="primary"
            >
              LOGOUT
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationBottom;
