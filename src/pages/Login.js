import React, { useRef, useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

import Modal from "../components/UI/Modal";
import "./components/styles/Login.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import IMG from "../images/6tynine/2.jpg";
import { CrossIcon, Button, LogInIcon, Alert, Badge } from "evergreen-ui";

// VALIDATIONS

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isPassword = (password) => {
  if (password.length < 7 || password.length > 15) {
    return false;
  } else {
    return true;
  }
};

const Login = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const auth = getAuth();

  const authCtx = useContext(AuthContext);
  const [error, setError] = useState({
    valid: true,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // ADD VALIDATION
    if (!isEmail(enteredEmail)) {
      return setError({
        ...error,
        valid: false,
        message: "Email is Invalid. Please Input a Valid email",
      });
    }

    if (!isPassword(enteredPassword)) {
      return setError({
        ...error,
        valid: false,
        message:
          "Password is Invalid. Please input a Password between 7 and 15 characters",
      });
    }

    setIsLoading(true);

    const userMessage = authCtx.loginEscort(enteredEmail, enteredPassword);

    props.onClose();

    setIsLoading(false);
  };

  const resetPassword = async () => {
    const enteredEmail = emailInputRef.current.value;

    await sendPasswordResetEmail(auth, enteredEmail)
      .then(() => {
        setError({
          ...error,
          valid: true,
          message: "",
        });
        alert(
          "Password Reset Email Sent, Check Spam Folder if not found in Primary Folder."
        );
      })
      .catch((error) => {
        setError({
          ...error,
          valid: false,
          message: "Email does not Exist",
        });
      });
  };

  return (
    <Modal onClose={props.onClose}>
      <div>
        <img src={IMG} className="login-img" />
      </div>
      <div className="login-wrapper" align="center">
        <form onSubmit={submitHandler}>
          <p>
            <label className="input-label">Email : </label>
            <input type="email" className="input-field" ref={emailInputRef} />
          </p>

          <div>
            <label className="input-label">Password : </label>
            <input
              type="password"
              className="input-field"
              ref={passwordInputRef}
            />
          </div>
          {error.message && (
            <div>
              <Alert margin={10} title="Error" intent="danger">
                {error.message}
              </Alert>
            </div>
          )}
          <div>
            <Button
              iconBefore={LogInIcon}
              intent="success"
              appearance="primary"
              margin={10}
            >
              LOGIN
            </Button>
          </div>

          <p>
            <Badge
              color="red"
              onClick={() => {
                if (!isEmail(emailInputRef.current.value)) {
                  return setError({
                    ...error,
                    valid: false,
                    message:
                      "Email is Invalid. Please Input a Valid email in the Email Field and try again",
                  });
                }
                resetPassword();
              }}
            >
              Reset Password
            </Badge>
          </p>

          <p>
            Dont have an account ?
            <br />
            <b
              onClick={() => {
                history.push("/signup");
                props.onClose();
              }}
            >
              SignUp
            </b>
          </p>
        </form>
        <br />
        <button onClick={props.onClose}>
          <CrossIcon />
        </button>
      </div>
    </Modal>
  );
};

export default Login;
