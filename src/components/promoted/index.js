import React from "react";
import IMG from "../../images/test.png";

export default function Promoted() {
  return (
    <div className="p-2 flex  overflow-x-scroll">
      <div className="w-[30%] h-[30%]">
        <img src={IMG} alt="james" className="rounded-full" />
      </div>
      <div className="w-[30%]">
        <img src={IMG} alt="james" />
      </div>
      <div className="w-[30%]">
        <img src={IMG} alt="james" />
      </div>
    </div>
  );
}
