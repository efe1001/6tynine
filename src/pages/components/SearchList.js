import React from "react";
import { Link } from "react-router-dom";

import { Badge } from "evergreen-ui";

import stars from "../../images/11.png";
import prenium from "../../images/1.png";
import AVATAR from "../../images/avatar.png";

const SearchList = ({ currentEscorts }) => {
  return (
    <>
      <div>
        {currentEscorts.map((escort) => (
          <>
            <Link to={`/escorts/${escort.id}`}>
              <div className="px-5 mb-5 relative" key={escort.id}>
                <div className="w-full">
                  <img
                    src={escort.url || AVATAR}
                    alt="Album"
                    className="rounded-md w-full"
                    style={{ height: "500px" }}
                  />
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 right-10 bottom-0 border-solid border-2 border-gray-500 rounded-md">
                  <h4 class="font-semibold text-slate-100 bg-gray-800 p-1 ">
                    {escort.displayname} - {escort.state}
                  </h4>
                </div>

                <div className="absolute flex justify-between transform -translate-y-1/2 right-3 top-0">
                  {escort.verified === 1 ? (
                    <div className="badge badge-accent ">verified</div>
                  ) : (
                    <div className="badge badge-warning">unverified</div>
                  )}
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};

export default SearchList;
