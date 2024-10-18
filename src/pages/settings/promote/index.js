import React from "react";
import VERIFIED from "../../../images/verified.png";
import VERIFIED_bg from "../../../images/verified-bg copy.jpg";
import IMG from "../../../images/WhatsApp_icon.png";
import { Button, HomeIcon, CircleArrowLeftIcon } from "evergreen-ui";
import { useHistory, Link } from "react-router-dom";

export default function PromoteYourAccount() {
  const history = useHistory();

  return (
    <>
      <div align="center" className="mt-5">
        <Button
          margin={10}
          intent="success"
          iconBefore={HomeIcon}
          onClick={() => {
            history.push("/");
          }}
        >
          HOME
        </Button>

        <Button
          margin={10}
          intent="danger"
          iconBefore={CircleArrowLeftIcon}
          onClick={() => {
            history.goBack();
          }}
        >
          GO BACK
        </Button>
      </div>
      <div className="bg-gray-100 m-4 rounded-xl">
        <img src={VERIFIED_bg} className="rounded-xl" />
        <div align="center" className="p-2">
          <img src={VERIFIED} style={{ width: "30px" }} />
          <b>Promote your Account</b>

          <p className="mt-3">
            <b>Huge Benefits</b> of Promoting your 6tynine.com Profile
            <br />
            1. Your Profile will be placed first on all searches.
            <br />
            2. Recommended to Active Clients.
            <br />
            3. Only Promoted Accounts are placed on our Homepage Slider.
            <br />
            4. Promoted accounts are the first to be shown for States.
          </p>

          <p className="mt-5 mb-2">
            <b>6tynine PROMOTION PLANS</b>
          </p>

          <p>
            <ul>
              <li>N5,000 for 1 week</li>
              <li>N10,000 for 1 Month</li>
              <li>N50,000 for LifeTime Promotion</li>
            </ul>
          </p>

          <p className="m-3">You can direct message ADMIN to make payment</p>

          <p>
            <a href="https://api.whatsapp.com/send?phone=2348119562376">
              <img className="w-[50%]" src={IMG} alt="contact-admin" />
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
