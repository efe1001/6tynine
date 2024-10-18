import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavigationBar from "../../../components/Navigation";

// Material UI
import PortraitIcon from "@mui/icons-material/Portrait";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase-config";
import { Spinner } from "evergreen-ui";

export default function DeleteGalleryImages() {
  const [galleryUrls, setGalleryUrls] = useState(null);
  const history = useHistory();

  const email = localStorage.getItem("email");

  const galleryFolder = email + "/gallery/";
  const galleryListRef = ref(storage, galleryFolder);

  const getGalleryImages = async () => {
    setGalleryUrls([]);
    const result = await listAll(galleryListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setGalleryUrls((prev) => [...prev, url]);
        });
      });
    });

  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  if (!galleryUrls) {
    return (
      <>
        <div className="m-2" align="center">
          {!galleryUrls && (
            <>
              <Spinner />
              Loading ...
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <NavigationBar />
      <div className="mx-2">
        <div className="text-xl" align="center">
          <PortraitIcon /> Delete Gallery Images
        </div>

        <div className="m-2" align="center">
          {galleryUrls.length === 0 && (
            <>
              <Stack sx={{ width: "100%" }} spacing={2} marginTop={0}>
                <Alert severity="warning">
                  You do not have any Gallery Images
                </Alert>
              </Stack>
            </>
          )}
        </div>

        {galleryUrls.map((image) => (
          <div className="m-5" align="center">
            <img
              src={image}
              className="rounded-xl w-full mb-3"
              style={{ height: "350px" }}
              alt="Gallary Image"
            />

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                const desertRef = ref(storage, image);
                // Delete the file
                deleteObject(desertRef)
                  .then(() => {
                    // File deleted successfully
                    alert("Successfully deleted");
                    history.go(0);
                  })
                  .catch((error) => {
                    // Uh-oh, an error occurred!
                    alert("Error - Image not deleted");
                  });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
