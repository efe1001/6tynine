import { NavLink, Route } from "react-router-dom";

import profile from "../../images/profile-1.jpg";
import profile2 from "../../images/profile-2.jpg";
import profile3 from "../../images/profile-3.jpg";
import profile4 from "../../images/profile-4.jpg";

import EscortItem from "./EscortItem";

import { Button, MoreIcon, LogInIcon } from "evergreen-ui";

const NewEscorts = () => {
  return (
    <div className="promoted">
      <div style={{ display: "flex" }}>
        <div className="promoted-title" style={{ flex: "1" }}>
          Newly Joined
        </div>
        <div className="promoted-title">
          <Button
            marginRight={10}
            intent="danger"
            iconBefore={MoreIcon}
            appearance="primary"
          >
            SEE MORE
          </Button>
        </div>
      </div>

      <div className="promoted-escorts">
        <EscortItem name="jessica" location="wuse" img={profile} id={1} />
        <EscortItem name="Anny" location="Dawaki" img={profile3} id={3} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
        <EscortItem name="Anny" location="Dawaki" img={profile4} id={4} />
      </div>

      <div align="center">
        <Button
          marginRight={10}
          intent="danger"
          iconBefore={MoreIcon}
          appearance="primary"
        >
          SEE MORE
        </Button>
      </div>
    </div>
  );
};

export default NewEscorts;
