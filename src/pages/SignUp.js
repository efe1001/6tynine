import { useHistory } from "react-router-dom";

// CSS STYLING
import "./components/styles/SignUp.css";

import { ConfirmIcon, Button, Alert } from "evergreen-ui";

const SignUp = (props) => {
  const history = useHistory();

  const escortSignupHandler = () => {
    history.push("/escort-register");
  };

  return (
    <>
      <div className="signup-card">
        <Alert intent="success" title="Register as Independent Escort">
          FREE
        </Alert>
        <div className="signup-bk">
          <p>
            <ConfirmIcon color="green" /> Add a single profile
          </p>
          <p>
            <ConfirmIcon color="green" /> Add profile pictures
          </p>
          <p>
            <ConfirmIcon color="green" /> Add contact information
          </p>
          <p>
            <ConfirmIcon color="green" /> Upgrade to prenium
          </p>
          <p>
            <ConfirmIcon color="green" /> Featured position
          </p>
          <p>
            <ConfirmIcon color="green" /> Add tours
          </p>
          <p>
            <ConfirmIcon color="green" /> Add blacklisted clients
          </p>
          <p>
            <ConfirmIcon color="green" /> Post classified ads
          </p>
          <p>
            <ConfirmIcon color="green" /> Many more
          </p>

          <div className="signup-card-bottom">
            <Button
              onClick={escortSignupHandler}
              marginRight={16}
              appearance="primary"
              intent="success"
            >
              SIGN UP - FREE
            </Button>
          </div>
        </div>
      </div>

      <br />

      <div className="signup-card">
        <Alert  intent="success" title="Register as a Guest/Client">FREE</Alert>

        <div className="signup-bk">
          <p>
            <ConfirmIcon color="green" /> Mark favorite porfiles
          </p>
          <p>
            <ConfirmIcon color="green" /> See profile photos
          </p>
          <p>
            <ConfirmIcon color="green" /> Contact escorts
          </p>
          <p>
            <ConfirmIcon color="green" /> Add reviews to escorts and rate them
          </p>
          <p>
            <ConfirmIcon color="green" /> Post classified
          </p>
          <div className="signup-card-bottom">
            <Button  intent="success" marginRight={16} appearance="primary" disabled>
              SIGN UP - FREE
            </Button>
          </div>
        </div>
      </div>

      <br />

      <div className="signup-card">
        <Alert  intent="success" title="Register as a Vendor">FREE</Alert>

        <div className="signup-bk">
          <p>
            <ConfirmIcon color="green" /> Upload products to the market place
          </p>
          <p>
            <ConfirmIcon color="green" /> reply to inquiries from potential
            customers
          </p>
          <p>
            <ConfirmIcon color="green" /> Make sales
          </p>
          <p>
            <ConfirmIcon color="green" /> Withdraw your earnings
          </p>
          <div className="signup-card-bottom">
            <Button
              disabled={true}
              marginRight={16}
              intent="success"
              appearance="primary"
            >
              SIGN UP - FREE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
