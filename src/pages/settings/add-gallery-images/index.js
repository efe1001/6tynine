import React, { useState } from "react";
import NavigationBar from "../../../components/Navigation";
import MultipleFileUpload from "../../components/MultipleFileUpload";

// Evergreen UI
import { Spinner } from "evergreen-ui";

// Material Imports
import PortraitIcon from "@mui/icons-material/Portrait";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { uploadGalleryImages } from "../../../lib/data-upload/upload-multiple-images";

export default function AddGalleryImages() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState();
  const [success, setSuccess] = useState();

  const handleImageChange = (files) => {
    if (files.length > 10) {
      setError("Please Upload Maximum of 10 Files");
      return;
    }

    let updatedGallery = [];

    for (let i = 0; i < files.length; i++) {
      const newImage = files[i];
      newImage["id"] = Math.random();

      if (
        !files[i].name.match(/\.(jpg|jpeg|png|gif)$/) ||
        files[0].size > 5000000
      ) {
        setError("Image File not Supported, Please ReUpload");
      } else {
        setError(false);

        updatedGallery.push(newImage);
      }
    }

    setGalleryFiles(updatedGallery);
    console.log(updatedGallery);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const uploadGallery = await uploadGalleryImages(galleryFiles);

    if (uploadGallery !== "success") {
      setError("Image Upload  Failed, Please Re-try");
    } else {
      setSuccess("Gallery Images Uploaded Successfully.");
    }

    setLoading(false);
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavigationBar />

      <div className="p-2">
        <Stack sx={{ width: "100%" }} spacing={2} marginTop={0}>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </div>

      <div className="mx-2">
        <div className="text-xl" align="center">
          <PortraitIcon /> Add Gallery Images
        </div>

        <MultipleFileUpload onChange={handleImageChange} />
      </div>

      <div className="p-2">
        <Stack sx={{ width: "100%" }} spacing={2} marginTop={0}>
          {success && <Alert severity="success">{success}</Alert>}
        </Stack>
      </div>

      <div align="center">{loading && <Spinner />}</div>

      <div align="center" className="mb-5">
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
