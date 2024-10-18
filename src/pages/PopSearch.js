import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  SearchIcon,
  SearchInput,
  Button,
  Select,
  CrossIcon,
} from "evergreen-ui";

import Modal from "../components/UI/Modal";

const PopSearch = (props) => {
  const [formLocation, setFormLocation] = useState("all");
  const [formDisplayName, setFormDisplayName] = useState("all");
  const [formBsize, setFormBsize] = useState("all");
  const [prenium, setPrenium] = useState(false);
  const [verified, setVerified] = useState(false);

  const history = useHistory();

  const changeDisplayNameHandler = (event) => {
    setFormDisplayName(event.target.value);
  };

  const changeLocationHandler = (event) => {
    setFormLocation(event.target.value);
  };
  const changeBsizeHandler = (event) => {
    setFormBsize(event.target.value);
  };
  const preniumChangeHandler = (event) => {
    setPrenium(!prenium);
  };
  const verifiedChangeHandler = (event) => {
    setVerified(!verified);
  };

  const searchHandler = () => {
    let verifiedInput;

    if (verified) {
      verifiedInput = "all";
    }

    history.replace(
      "/search?state=" +
        formLocation +
        "&bsize=" +
        formBsize +
        "&prenium=" +
        prenium +
        "&verified=" +
        verifiedInput +
        "&displayname=" +
        formDisplayName
    );

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="quicksearch-container">
        <div className="title">QuickSearch</div>
        <div>
          <SearchInput
            placeholder="Escort Display Name..."
            width="100%"
            marginBottom={10}
            onChange={changeDisplayNameHandler}
          />
          <Select
            width="100%"
            marginBottom={10}
            className="quicksearch-dropdown"
            onChange={changeLocationHandler}
            defaultValue="all"
          >
            <option value="all" selected>
              Location
            </option>
            <option value="Dubai">Dubai</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Turkey">Turkey</option>
            <option value="Cote d'Ivoire">Cote d'Ivoire</option>
            <option value="Ghana">Ghana</option>
            <option value="Usa">Usa</option>
            <option value="Cryus">Cyrus</option>
            <option value="Abia">Abia</option>
            <option value="Abuja">Abuja</option>
            <option value="Adamawa">Adamawa</option>
            <option value="Akwa Ibom">Akwa Ibom</option>
            <option value="Anambra">Anambra</option>
            <option value="Bauchi">Bauchi</option>
            <option value="Bayelsa">Bayelsa</option>
            <option value="Benue">Benue</option>
            <option value="Borno">Borno</option>
            <option value="Cross River">Cross River</option>
            <option value="Delta">Delta</option>
            <option value="Ebonyi">Ebonyi</option>
            <option value="Edo">Edo</option>
            <option value="Ekiti">Ekiti</option>
            <option value="Enugu">Enugu</option>
            <option value="Gombe">Gombe</option>
            <option value="Imo">Imo</option>
            <option value="Jigawa">Jigawa</option>
            <option value="Kaduna">Kaduna</option>
            <option value="Kebbi">Kebbi</option>
            <option value="Kogi">Kogi</option>
            <option value="Kwara">Kwara</option>
            <option value="Lagos">Lagos</option>
            <option value="Nasarawa">Nasarawa</option>
            <option value="Niger">Niger</option>
            <option value="Ogun">Ogun</option>
            <option value="Ondo">Ondo</option>
            <option value="Osun">Osun</option>
            <option value="Oyo">Oyo</option>
            <option value="Plateau">Plateau</option>
            <option value="Rivers">Rivers</option>
            <option value="Sokoto">Sokoto</option>
            <option value="Taraba">Taraba</option>
            <option value="Yobe">Yobe</option>
            <option value="Zamfara">Zamfara</option>
          </Select>
          <br />
          <Select
            width="100%"
            className="quicksearch-dropdown"
            onChange={changeBsizeHandler}
          >
            <option selected="selected" value="all">
              Bust Size
            </option>
            <option value="Average">Average</option>
            <option value="Small">Small</option>
            <option value="Big">Big</option>
            <option value="Very Big">Very Big</option>
            <option value="Enormous">Enormous</option>
          </Select>

          <div>
            <p>
              <input
                type="checkbox"
                name="verified"
                onChange={verifiedChangeHandler}
                checked={verified}
              />
              Only Verified
            </p>
            <p>
              <input
                type="checkbox"
                name="prenium"
                onChange={preniumChangeHandler}
              />
              Only Prenium
            </p>

            <div align="center">
              <Button
                marginRight={10}
                intent="success"
                iconBefore={SearchIcon}
                appearance="primary"
                onClick={searchHandler}
              >
                SEARCH
              </Button>
            </div>

            <div align="center" style={{ margin: "10px" }}>
              <button onClick={props.onClose}>
                <CrossIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopSearch;
