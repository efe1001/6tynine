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
          <b>Get verified</b>

          <p className="mt-3">
            Prove your the one behind the profile
            <br />
            Verified accounts get more views and calls from clients
          </p>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-full mt-3">
            <Link className="text-white" to="/verifyyouraccount">
              NEXT
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
