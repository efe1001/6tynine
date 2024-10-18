import React, { useState, useContext } from "react";
import AuthContext from "./store/auth-context";
import { Helmet } from "react-helmet";
// PAKAGES IMPORTS
import { Route, Switch, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
// PAGES IMPORTS
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EscortProfile from "./pages/EscortProfile";
import Search from "./pages/Search";
import Settings from "./pages/settings/Settings";

// AUTHENTICATED PAGES
import Profile from "./pages/Profile";

// LOGIN & SIGNUP
import Login from "./pages/Login";
import PopSearch from "./pages/PopSearch";
import SignUp from "./pages/SignUp";
import EscortRegister from "./pages/Escort-Register/EscortRegister";

import IMG from "./images/WhatsApp_icon.png";
import PromoteYourAccount from "./pages/settings/promote";
import VerifyYourAccount from "./pages/settings/verify";
import ChangeProfilePicture from "./pages/settings/change-profile-picture";
import AddGalleryImages from "./pages/settings/add-gallery-images";
import DeleteGalleryImages from "./pages/settings/delete-gallery-images";
import EditProfileInfo from "./pages/settings/edit-profile-info";
import ResponsiveAppBar from "./components/test-bar";

const TRACKING_ID = "UA-250702475-1";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const [popUp, setPopUp] = useState(false);
  const [search, setSearch] = useState(false);
  const authCtx = useContext(AuthContext);

  const showPopUpHandler = () => {
    setPopUp(true);
  };
  const hidePopUpHandler = () => {
    setPopUp(false);
  };

  const showSearchHandler = () => {
    setSearch(true);
  };

  const hideSearchHandler = () => {
    setSearch(false);
  };

  return (
    <>
      <Helmet>
        <title>6tynine.com</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {/* ======= NAVBAR ======== */}
      
      {/* <ResponsiveAppBar /> */}

       <NavBar
        onOpen={showPopUpHandler}
        onClose={hidePopUpHandler}
        onOOpen={showSearchHandler}
      /> 



      {popUp && <Login onClose={hidePopUpHandler} />}
      {search && <PopSearch onClose={hideSearchHandler} />}
      {/* <Slider /> */}

      <a href="https://api.whatsapp.com/send?phone=2348119562376">
        <img className="floating-object" src={IMG} alt="contact-admin" />
      </a>

      {/* ======= MAIN PAGE ======== */}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/escorts/:escortID">
          <EscortProfile />
        </Route>

        <Route path="/search">
          <Search />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/promoteyouraccount">
          <PromoteYourAccount />
        </Route>

        <Route path="/verifyyouraccount">
          <VerifyYourAccount />
        </Route>

        <Route path="/escort-register">
          <EscortRegister />
        </Route>

        {authCtx.escortLoggedIn && (
          <Route path="/settings">
            <Settings />
          </Route>
        )}

        {authCtx.escortLoggedIn && (
          <Route path="/changeprofilepicture">
            <ChangeProfilePicture />
          </Route>
        )}

        {authCtx.escortLoggedIn && (
          <Route path="/addgalleryimages">
            <AddGalleryImages />
          </Route>
        )}

        {authCtx.escortLoggedIn && (
          <Route path="/deletegalleryimages">
            <DeleteGalleryImages />
          </Route>
        )}

        {authCtx.escortLoggedIn && (
          <Route path="/editprofileinfo">
            <EditProfileInfo />
          </Route>
        )}

        {authCtx.escortLoggedIn && (
          <Route path="/profile">
            <Profile />
          </Route>
        )}
        {!authCtx.escortLoggedIn && <Redirect to="/" />}

        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
