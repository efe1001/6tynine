import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext({
  email: "",
  escortLoggedIn: false,
  clientLoggedIn: false,
  loginEscort: (email, password, typeofUser) => {},
  loginClient: (email, password, typeofUser) => {},
  logout: () => {},
  escortsData: {},
});

const retrieveStoredEmail = () => {
  const storedEmail = localStorage.getItem("email");

  if (!storedEmail) {
    return null;
  }

  const userType = localStorage.getItem("userType");

  return {
    email: storedEmail,
    userType,
  };
};

export const AuthContextProvider = (props) => {
  const userData = retrieveStoredEmail();
  let initialEscortEmail;
  let initialClientEmail;

  if (userData) {
    if (userData.userType === "escort") {
      initialEscortEmail = userData.email;
    } else {
      initialClientEmail = userData.email;
    }
  }

  const [escortEmail, setEscortEmail] = useState(initialEscortEmail);
  const [clientEmail, setClientEmail] = useState(initialClientEmail);

  const escortIsLoggedIn = !!escortEmail;
  const clienttIsLoggedIn = !!clientEmail;

  const escortLoginHandler = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEscortEmail(user.user.email);
      localStorage.setItem("email", user.user.email);
      localStorage.setItem("userType", "escort");
      alert("Login Successful");
    } catch (error) {
      console.log(error.message);
      alert("Invalid Email and Password");
    }
  };

  const clientLoginHandler = (email, password, typeofUser) => {
    setEscortEmail(email);
  };

  const logoutHandler = () => {
    setEscortEmail(null);
    setClientEmail(null);
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
  };


  const contextValue = {
    clientEmail: clientEmail,
    escortEmail: escortEmail,
    escortLoggedIn: escortIsLoggedIn,
    clientLoggedIn: clienttIsLoggedIn,
    loginEscort: escortLoginHandler,
    loginClient: clientLoginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
