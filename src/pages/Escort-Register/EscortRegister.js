import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import "./EscortRegister.css";

import SignupInfo from "./SignupInfo";
import ContactInfo from "./ContactInfo";
import EscortInfo from "./EscortInfo";
import PreferenceInfo from "./PreferenceInfo";
import RatesInfo from "./RatesInfo";

import { Spinner, CircleArrowLeftIcon, Button, Alert } from "evergreen-ui";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isPassword = (password) => {
  if (password.length < 7 || password.length > 15) {
    return false;
  } else {
    return true;
  }
};
const isEmptyDisplayName = (value) => {
  if (value.length < 4 || value.length > 20) {
    return false;
  } else {
    return true;
  }
};
const isEmpty = (value) => {
  if (value.length < 5 || value.length > 200) {
    return false;
  } else {
    return true;
  }
};

const EscortRegister = () => {
  const escortsCollectionRef = collection(db, "escorts");
  const [page, setPage] = useState(0);
  const history = useHistory();

  const [error, setError] = useState({
    valid: true,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayname: "",
    age: "18",
    heading: "Sexy and Confident",
    bio: "",
    ethnicity: "Black",
    height: "Average",
    weight: "Average",
    bustsize: "Average",
    looks: "Average",
    smoker: "",
    sexualorientation: "HetroSexual(Straight)",
    owo: "NO",
    oral: "NO",
    cim: "NO",
    cof: "NO",
    sixtynine: "NO",
    threesome: "NO",
    extraball: "NO",
    shorttime: "N20,000",
    overnight: "N40,000",
    weekend_rate: "N50,000",
    state: "",
    phone_number_1: "",
    phone_number_2: "",
    whatsapp_number: "",
    profile_picture: [],
  });

  const register = async () => {
    // AUTHENTICATION REGISTRATION
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
    } catch (error) {
      console.log(error.message);
      return setError({
        ...error,
        valid: false,
        message: "Account Creation Unsuccessful " + error.message,
      });
    }

    // ESCORT CREATION
    await addDoc(escortsCollectionRef, {
      email: formData.email,
      displayname: formData.displayname,
      age: formData.age,
      heading: formData.heading,
      bio: formData.bio,
      ethnicity: formData.ethnicity,
      height: formData.height,
      weight: formData.weight,
      bustsize: formData.bustsize,
      looks: formData.looks,
      smoker: formData.smoker,
      sexualorientation: formData.sexualorientation,
      owo: formData.owo,
      oral: formData.oral,
      cim: formData.cim,
      cof: formData.cof,
      sixtynine: formData.sixtynine,
      threesome: formData.threesome,
      extraball: formData.extraball,
      shorttime: formData.shorttime,
      overnight: formData.overnight,
      weekend_rate: formData.weekend_rate,
      state: formData.state,
      phone_number_1: formData.phone_number_1,
      phone_number_2: formData.phone_number_2,
      whatsapp_number: formData.whatsapp_number,
      promoted: 0,
      verified: 0,
      promotedEnd: 0,
    });

    setSuccess(true);
    setIsLoading(false);

    // PROFILE IMAGE SUBMITTION
    const imageRef = ref(
      storage,
      `${formData.email}/${formData.profile_picture.name + v4()}`
    );
    uploadBytes(imageRef, formData.profile_picture).then(() => {
      alert("Account has been successfully created. Proceed to Log In");
    });
  };

  const handleFormValidation = () => {
    if (!isEmail(formData.email)) {
      return setError({
        ...error,
        valid: false,
        message: "Email is Invalid. Please Input a Valid email",
      });
    }

    if (!isPassword(formData.password)) {
      return setError({
        ...error,
        valid: false,
        message:
          "Password is Invalid. Please input a Password between 7 and 15 characters",
      });
    }

    if (!isEmptyDisplayName(formData.displayname)) {
      return setError({
        ...error,
        valid: false,
        message:
          "Display Name is Invalid. Please input a name between 4 and 20 characters",
      });
    }

    if (!formData.profile_picture) {
      return setError({
        ...error,
        valid: false,
        message: "You need a Profile Picture to Create an Account",
      });
    }

    if (!formData.phone_number_1) {
      return setError({
        ...error,
        valid: false,
        message: "You need at least 1 Phone Number to Create an Account",
      });
    }

    if (!formData.state) {
      return setError({
        ...error,
        valid: false,
        message: "Please select a current Location",
      });
    }

    setError({
      ...error,
      valid: true,
      message: "",
    });

    setIsLoading(true);
    register();
  };

  const FormTitles = [
    "Information",
    "Personal Information",
    "Preference Information",
    "Rates Information",
    "Contact Information",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <SignupInfo
          formData={formData}
          setFormData={setFormData}
          error={error}
          setError={setError}
        />
      );
    } else if (page === 1) {
      return <EscortInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <PreferenceInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 3) {
      return <RatesInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <ContactInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <>
      <div className="escort-register-wrapper">
        <Alert title="ESCORT SIGN UP">
          {FormTitles[page]} - {page + 1}/{FormTitles.length}
        </Alert>
        <br />
        <div className="progressbar">
          <div
            style={{
              width:
                page === 0
                  ? "20%"
                  : page === 1
                  ? "40%"
                  : page === 2
                  ? "60%"
                  : page === 3
                  ? "80%"
                  : "100%",
            }}
          ></div>
        </div>

        {isLoading && (
          <div align="center" style={{ margin: "20px" }}>
            <Spinner />
          </div>
        )}

        {success && (
          <>
            <Alert intent="success" title="Success" marginBottom={20}>
              Account was Successfully Created.
              <br />
              Please Login, and naviagte to your profile settings to upload more
              pictures in your Account.
            </Alert>
            <Button
              margin={10}
              intent="success"
              iconBefore={CircleArrowLeftIcon}
              onClick={() => {
                history.push("/");
              }}
            >
              GO BACK
            </Button>
          </>
        )}

        {!error.valid ? (
          <div>
            <Alert intent="danger" title="Error" marginBottom={20}>
              {error.message}
            </Alert>
          </div>
        ) : null}

        <div className="escort-register-bk">
          {PageDisplay()}

          <p style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              appearance="primary"
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </Button>
            <Button
              appearance="primary"
              onClick={() => {
                if (page === FormTitles.length - 1) {
                  handleFormValidation();
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default EscortRegister;
