import React from "react";
import LazyLoad from "react-lazy-load";

import prenium from "../../images/2.png";
import locationPin from "../../images/4.png";
import stars from "../../images/11.png";

import AVATAR from "../../images/avatar.png";

import {
  TickCircleIcon,
  LocateIcon,
  Badge,
  Button,
  TrashIcon,
  IconButton,
  TickIcon,
} from "evergreen-ui";

const SliderProps = (props) => {
  return (
    <div className="px-1 mt-5 relative">
      <div className="w-full">
        <img
          src={props.img || AVATAR}
          alt={props.name}
          className="rounded-md w-full"
          style={{ height: "450px" }}
        />
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 right-5 bottom-3 border-solid border-2 border-gray-500 rounded-md">
        <h4 class="font-semibold text-slate-100 bg-gray-800 p-1 ">
          {props.name} - {props.location}
        </h4>
      </div>

      <div className="absolute flex justify-between transform -translate-y-1/2 right-3 top-0">
        {props.verified === 1 ? (
          <div className="badge badge-accent ">verified</div>
        ) : (
          <div className="badge badge-warning">unverified</div>
        )}
      </div>
    </div>
  );
};

export default SliderProps;
