import React, { useEffect, useState } from "react";

// Default Avatar import
import IMG from "../../../images/avatar.png";

// Firebase Imports
import { storage } from "../../../firebase-config";
import { getDownloadURL, listAll, ref } from "firebase/storage";

// Nav Bar component
import NavigationBar from "../../../components/Navigation";

// Evergreen UI Import
import { FilePicker, Spinner } from "evergreen-ui";
//Material UI Import
import PortraitIcon from "@mui/icons-material/Portrait";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// Validation Functions
import { validateProfileImage } from "../../../lib/validations/image-validation";
import { uploadImage } from "../../../lib/data-upload/upload-image";

export default function ChangeProfilePicture() {
  const [userImage, setUserImage] = useState(IMG);
  const [newImage, setNewImage] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //  User Email from Local Storage
  const email = localStorage.getItem("email");

  // Fetch User Image and  set userImage Set
  const imageFolder = email + "/";
  const imagesListRef = ref(storage, imageFolder);
  const getUserImages = () => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setUserImage(url);
          console.log(url);
        });
      });
    });
  };

  // Handling User Image Upload Validation
  const uploadProfilePicture = (image) => {
    setSuccess(false);

    const validateMessage = validateProfileImage(image);
    console.log(validateMessage);
    if (validateMessage === "success") {
      setNewImage(image);
      setError(null);
    } else {
      setError(validateMessage);
    }
  };

  useEffect(() => {
    getUserImages();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    //Upload image, and delete previous Image
    const result = await uploadImage(newImage, userImage);
    console.log(result);
    if (result === "success") {
      setSuccess(true);
    } else {
      setError("Profile Photo Upload Failed, Please Re-try");
    }

    setLoading(false);
  };

  // Loading  of Spinner

  return (
    <div style={{ height: "100vh" }}>
      <NavigationBar />

      <div className=" m-2">
        <div className="text-xl mt-2" align="center">
          <PortraitIcon /> Change Profile Photo
        </div>

        <div className="p-5">
          {!newImage ? (
            <img
              src={userImage}
              className="rounded-xl w-full"
              style={{ height: "350px" }}
              alt="Display"
            />
          ) : (
            <>
              <img
                src={URL.createObjectURL(newImage)}
                className="rounded-xl w-full"
                style={{ height: "350px" }}
                alt="Display"
              />
              {console.log(newImage)}
            </>
          )}
        </div>

        <FilePicker
          width={"100%"}
          placeholder="Change Profile Picture"
          onChange={(files) => uploadProfilePicture(files[0])}
        />

        <Stack sx={{ width: "100%" }} spacing={2} marginTop={2}>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>

        <Stack sx={{ width: "100%" }} spacing={2}>
          {success && (
            <Alert severity="success">Image Uploaded Successfully</Alert>
          )}
        </Stack>
      </div>

      <div align="center">{loading && <Spinner />}</div>

      <div align="center">
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SendIcon />}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
