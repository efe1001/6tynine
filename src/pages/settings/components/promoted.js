import React from "react";
import VERIFIED from "../../../images/verified.png";
import VERIFIED_bg from "../../../images/verified-bg copy.jpg";
import { Link } from "react-router-dom";
export default function Verified() {
  return (
    <>
      <div className="bg-gray-100 m-2 rounded-xl">
        <img src={VERIFIED_bg} className="rounded-xl" />
        <div align="center" className="p-2">
          <img src={VERIFIED} style={{ width: "30px" }} />
          <b>Promote your Account</b>

          <p className="mt-3">
            Huge Benefits of Promoting your 6tynine.com Profile
            <br />
            1. Your Profile will be placed first on all searches
            <br />
            2. Recommended to Active Clients
            <br />
            3. Placed on our Homepage Slider
          </p>

          <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-full mt-3">
            <Link to="/promoteyouraccount" className="text-white">
              GET STARTED
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
