import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import stars from "../../images/11.png";
import prenium from "../../images/1.png";

import {
  TickCircleIcon,
  LocateIcon,
  Badge,
  Button,
  TrashIcon,
  IconButton,
  TickIcon,
} from "evergreen-ui";

const EscortItem = (props) => {

  console.log(props.url)

  return (
    <div style={{ padding: "20px" }}>
      <div className="cont">
        <Link to={`/escorts/${props.email}`}>
          <img src={props.url} alt="imagem" className="promoted-escorts-img" />

          <div className="bottom-writeup" style={{ padding: "10px" }}>
            <div className="bottom-writeup-1">
              <b>{props.name}</b>

              <br />
              <Badge color="blue">{props.location}</Badge>
            </div>

            <div className="bottom-writeup-2">
              <img src={stars} className="faze" />
              5/5
            </div>
          </div>
          <img src={prenium} className="top-right-sliderprops faze" />
        </Link>
      </div>
    </div>
  );
};

export default EscortItem;
