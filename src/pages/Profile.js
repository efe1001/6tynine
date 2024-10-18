import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getStorage,
  deleteObject,
  list,
} from "firebase/storage";
import { storage } from "../firebase-config";
import { v4 } from "uuid";

import {
  FilePicker,
  Spinner,
  Textarea,
  Select,
  Button,
  DoubleChevronLeftIcon,
  Alert,
} from "evergreen-ui";
import MultipleFileUpload from "./components/MultipleFileUpload";

// STYLES
import "./components/styles/Profile.css";

const Profile = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({
    valid: false,
    success: "",
    error: "",
  });

  const [imgUrl, setImgUrl] = useState();
  const [formIsValid, setFormIsValid] = useState({
    valid: true,
    profilepictureIsValid: true,
    profilepicture_message: "",
    galleryerrorMessage: "",
  });

  const entireFormIsValid =
    formIsValid.profilepictureIsValid && !formIsValid.galleryerrorMessage;
  const [escortInfo, setEscortInfo] = useState([]);
  const [updatedEscortInfo, setUpdatedEscortInfo] = useState({
    profilepicture: [],
    bio: escortInfo.bio,
    shorttime: escortInfo.shorttime,
    overnight: escortInfo.overnight,
    weekend_rate: escortInfo.weekend_rate,
    state: escortInfo.state,
    gallery: [],
    url: "",
  });

  const [galleryUrls, setGalleryUrls] = useState([]);

  const authCtx = useContext(AuthContext);
  const email = authCtx.escortEmail;
  const escortsCollectionRef = collection(db, "escorts");

  const imageFolder = email + "/";
  const imagesListRef = ref(storage, imageFolder);

  const galleryFolder = email + "/gallery/";
  const galleryListRef = ref(storage, galleryFolder);

  // RETRIVE ESCORT INFO
  const getUser = async () => {
    const data = await getDocs(escortsCollectionRef);
    const escortsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const results = escortsData.filter((escort) => {
      return escort.email === email;
    });
    setEscortInfo(results[0]);
    setIsLoading(false);
  };
  const getUserImages = () => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgUrl(url);
        });
      });
    });
  };

  const handleChange = (files) => {
    if (files.length > 10) {
      setFormIsValid({
        ...formIsValid,
        galleryerrorMessage: "Please upload only 10 files for your gallery",
      });

      return;
    }

    let updatedImg = [];
    for (let i = 0; i < files.length; i++) {
      const newImage = files[i];
      newImage["id"] = Math.random();

      if (
        !files[i].name.match(/\.(jpg|jpeg|png|gif)$/) ||
        files[0].size > 5000000
      ) {
        setFormIsValid({
          ...formIsValid,
          galleryerrorMessage: "Image File Type not supported, Please ReUpload",
        });
      } else {
        setFormIsValid({
          ...formIsValid,
          galleryerrorMessage: "",
        });

        updatedImg.push(newImage);
      }
    }

    setUpdatedEscortInfo({ ...updatedEscortInfo, gallery: updatedImg });
  };

  const getGalleryImages = () => {
    setGalleryUrls([]);
    listAll(galleryListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setGalleryUrls((prev) => [...prev, url]);
        });
      });
    });
  };

  useEffect(() => {
    getUser();
    getUserImages();
    getGalleryImages();
  }, []);

  const updateUser = async () => {
    const userDoc = doc(db, "escorts", escortInfo.id);
    const newFields = {
      bio: updatedEscortInfo.bio ? updatedEscortInfo.bio : escortInfo.bio,

      state: updatedEscortInfo.state
        ? updatedEscortInfo.state
        : escortInfo.state,

      shorttime: updatedEscortInfo.shorttime
        ? updatedEscortInfo.shorttime
        : escortInfo.shorttime,

      overnight: updatedEscortInfo.overnight
        ? updatedEscortInfo.overnight
        : escortInfo.overnight,

      weekend_rate: updatedEscortInfo.weekend_rate
        ? updatedEscortInfo.weekend_rate
        : escortInfo.weekend_rate,
    };
    await updateDoc(userDoc, newFields);
  };

  const profilePicture = () => {
    // OLD IMAGE DELETION
    const desertRef = ref(storage, imgUrl);
    // Delete the file
    console.log();

    if (desertRef._location.path_) {
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully

          // NEW PROFILE IMAGE SUBMITTION
          const imageRef = ref(
            storage,
            `${escortInfo.email}/${
              updatedEscortInfo.profilepicture.name + v4()
            }`
          );

          uploadBytes(imageRef, updatedEscortInfo.profilepicture).then(() => {
            alert("Account has been successfully Updated");
          });
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          setMessage({
            message,
            error: "Profile Picture not uploaded, Please contact Admin",
          });
          alert("Profile Picture not uploaded, Please contact Admin");
        });
    } else {
      // NEW PROFILE IMAGE SUBMITTION
      const imageRef = ref(
        storage,
        `${escortInfo.email}/${updatedEscortInfo.profilepicture.name + v4()}`
      );

      uploadBytes(imageRef, updatedEscortInfo.profilepicture).then(() => {
        alert("Account has been successfully Updated");
      });
    }
  };

  const galleryImages = () => {
    // GALLERY SUBMITTIONS
    if (updatedEscortInfo.gallery.length === 0) {
      console.log("do this");
    } else {
      for (let i = 0; i < updatedEscortInfo.gallery.length; i++) {
        const imageRef = ref(
          storage,
          `${escortInfo.email}/gallery/${
            updatedEscortInfo.gallery[i].name + v4()
          }`
        );
        uploadBytes(imageRef, updatedEscortInfo.gallery[i]).then(() => {
          alert("Successfully uploaded");
        });
      }
    }
  };

  const handleSubmit = () => {
    updateUser();

    if (updatedEscortInfo.profilepicture.length === 0) {
    } else {
      profilePicture();
    }

    if (updatedEscortInfo.gallery.length === 0) {
    } else {
      galleryImages();
    }

    setMessage({ message, success: "Account has been successfully Updated" });
  };

  if (isLoading) {
    return (
      <div className="profile-container" align="center">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <>
      <div className="profile-container" align="center">
        <h1>UPDATE PROFILE</h1>
        <div>{escortInfo.displayname}</div>

        <div>
          {updatedEscortInfo.profilepicture.length === 0 ? (
            <img src={imgUrl} className="avatar" alt="Profile" />
          ) : (
            <img src={updatedEscortInfo.url} className="avatar" alt="Profile" />
          )}

          <FilePicker
            width={"100%"}
            placeholder="Change Profile Picture"
            onChange={(files) => {
              setUpdatedEscortInfo({
                ...updatedEscortInfo,
                profilepicture: files[0],
                url: URL.createObjectURL(files[0]),
              });

              if (!files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
                setFormIsValid({
                  ...formIsValid,
                  profilepictureIsValid_message:
                    "You upoaded a wrong file type for Your Profile Picture, Please Change it",
                  profilepictureIsValid: false,
                });
              } else if (files[0].size > 5000000) {
                setFormIsValid({
                  ...formIsValid,
                  profilepictureIsValid_message:
                    "Please upload a file less than 5MB",
                  profilepictureIsValid: false,
                });
              } else {
                setFormIsValid({
                  ...formIsValid,
                  profilepictureIsValid_message: "",
                  profilepictureIsValid: true,
                });
              }
            }}
          />
        </div>

        <div>
          {formIsValid.galleryerrorMessage && (
            <>
              <Alert intent="danger" title="Error" marginBottom={10}>
                {formIsValid.galleryerrorMessage}
              </Alert>
            </>
          )}
        </div>

        <div>
          <label>
            <b>GALLERY</b>
            <br />
            <small>
              Select not more than 10 images, file should not be more than 50MB
            </small>
          </label>

          <MultipleFileUpload onChange={handleChange} />
          
        </div>

        <div className="register-fields">
          <label>LOCATION</label>

          <Select
            width="100%"
            marginBottom={10}
            className="quicksearch-dropdown"
            onChange={(event) =>
              setUpdatedEscortInfo({
                ...updatedEscortInfo,
                state: event.target.value,
              })
            }
          >
            <option selected="selected" value={escortInfo.state}>
              {escortInfo.state}
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
        </div>

        <div>
          <label>
            BIO <small>*short description about yourself</small>
          </label>
          <Textarea
            id="textarea-2"
            placeholder={escortInfo.bio}
            onChange={(event) => {
              setUpdatedEscortInfo({
                ...updatedEscortInfo,
                bio: event.target.value,
              });
            }}
          />
        </div>

        <div>
          <label>SHORT TIME</label>

          <Select
            width="100%"
            onChange={(event) => {
              setUpdatedEscortInfo({
                ...updatedEscortInfo,
                shorttime: event.target.value,
              });
            }}
          >
            <option value={escortInfo.shorttime} selected>
              {escortInfo.shorttime}
            </option>
            <option value="N20,000">N20,000</option>
            <option value="N35,000">N35,000</option>
            <option value="N40,000">N40,000</option>
            <option value="N50,000">N50,000</option>
            <option value="N70,000">N70,000</option>
            <option value="N100,000">N100,000</option>
            <option value="N150,000">N150,000</option>
            <option value="N200,000">N200,000</option>
          </Select>
        </div>

        <div>
          <label>OVER NIGHT</label>

          <Select
            width="100%"
            onChange={(event) => {
              setUpdatedEscortInfo({
                ...updatedEscortInfo,
                overnight: event.target.value,
              });
            }}
          >
            <option value={escortInfo.overnight} selected>
              {escortInfo.overnight}
            </option>
            <option value="N40,000">N40,000</option>
            <option value="N50,000">N50,000</option>
            <option value="N70,000">N70,000</option>
            <option value="N100,000">N100,000</option>
            <option value="N150,000">N150,000</option>
            <option value="N200,000">N200,000</option>
            <option value="N300,000">N300,000</option>
            <option value="N500,000">N500,000</option>
          </Select>
        </div>

        <div>
          <label>WEEKEND RATE</label>

          <Select
            width="100%"
            onChange={(event) => {
              setUpdatedEscortInfo({
                ...updatedEscortInfo,
                weekend_rate: event.target.value,
              });
            }}
          >
            <option value={escortInfo.weekend_rate} selected>
              {escortInfo.weekend_rate}
            </option>
            <option value="N50,000">N50,000</option>
            <option value="N100,000">N100,000</option>
            <option value="N200,000">N200,000</option>
            <option value="N300,000">N300,000</option>
            <option value="N500,000">N500,000</option>
            <option value="N1,000,000">N1,000,000</option>
          </Select>
        </div>

        <div>
          {message.success && (
            <>
              <Alert
                intent="success"
                title={message.success}
                marginBottom={10}
              />
              <Button
                onClick={() => {
                  history.push("/");
                }}
                iconBefore={DoubleChevronLeftIcon}
                marginRight={16}
                intent="success"
              >
                GO BACK
              </Button>
            </>
          )}
          {message.error && (
            <>
              <Alert intent="danger" title={message.error} marginBottom={10} />
              <Button
                onClick={() => {
                  history.push("/");
                }}
                iconBefore={DoubleChevronLeftIcon}
                marginRight={16}
                intent="danger"
              >
                GO BACK
              </Button>
            </>
          )}
        </div>

        <div>
          {formIsValid.profilepictureIsValid_message && (
            <>
              <Alert
                intent="danger"
                title={formIsValid.profilepictureIsValid_message}
                marginBottom={10}
              />
            </>
          )}
        </div>

        <div>
          <Button
            onClick={handleSubmit}
            marginRight={16}
            appearance="primary"
            intent="none"
            disabled={!entireFormIsValid}
            isLoading={message.valid}
          >
            SUBMIT
          </Button>
          <Button marginRight={16} appearance="primary" intent="danger">
            CANCEL
          </Button>
        </div>

        <h1>DELETE GALLERY IMAGES</h1>

        {galleryUrls.map((image) => (
          <>
            <img src={image} style={{ width: "100%" }} alt="Gallary" />

            <Button
              margin={10}
              intent="danger"
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
              DELETE
            </Button>
          </>
        ))}
      </div>
    </>
  );
};

export default Profile;
