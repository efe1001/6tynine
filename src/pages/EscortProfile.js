import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

import UnlockNumber from "./UnlockNumber";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { storage } from "../firebase-config";
import { ref, getDownloadURL, listAll } from "firebase/storage";

// IMPOTING ESCORTS_DATA
import AuthContext from "../store/auth-context";
import { useParams } from "react-router-dom";

import { Spinner } from "evergreen-ui";
import {
  HomeIcon,
  IconButton,
  Table,
  StatusIndicator,
  CircleArrowLeftIcon,
} from "evergreen-ui";
import EscortsStatus from "./components/escortsStatus";
import { removePromotion } from "../lib/check-promoted";

const EscortProfile = () => {
  const history = useHistory();
  const params = useParams();
  const [profileImgUrl, setProfileImgUrl] = useState();
  const [escortprofile, setEscortprofile] = useState();
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const escortID = params.escortID;

  const escortsCollectionRef = collection(db, "escorts");

  // RETRIVE ESCORT INFO
  const getUser = async () => {
    const data = await getDocs(escortsCollectionRef);
    const escortsData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const results = escortsData.filter((escort) => {
      return escort.id === escortID;
    });

    // Check if the user is a promoted account
    if (results[0].promoted === 1) {
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(currentTime)
      // check if user promoted has ended
      if (results[0].promotedEnd < currentTime) {
        // If user promotion has ended, remove their promotion
        console.log("gg")
        removePromotion(results[0].id);
      }
    }

    // GET USER IMAGES
    const imageFolder = results[0].email + "/";
    const imageListRef = ref(storage, imageFolder);

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setProfileImgUrl(url);
          setIsLoading(false);
        });
      });
    });

    // GET USER GALLERY IMAGES
    const galleryFolder = results[0].email + "/gallery/";
    const galleryListRef = ref(storage, galleryFolder);

    setGalleryUrls([]);
    listAll(galleryListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setGalleryUrls((prev) => [...prev, url]);
        });
      });
    });

    setEscortprofile(results[0]);
  };

  useEffect(() => {
    getUser();
  }, [escortID]);

  if (!escortprofile) {
    return (
      <div align="center">
        <Spinner margin={30} />
      </div>
    );
  }

  return (
    <>
      <EscortsStatus />
      <div className="escortprofile-container">
        <div align="center">
          <IconButton
            icon={HomeIcon}
            marginRight={5}
            intent="success"
            onClick={() => {
              history.push("/");
            }}
          />
          <IconButton
            icon={CircleArrowLeftIcon}
            marginRight={5}
            intent="danger"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>

        <div align="center" className="escortprofile-img">
          {!profileImgUrl ? (
            <Spinner />
          ) : (
            <div className="relative">
              <div className="w-full">
                <img
                  src={profileImgUrl}
                  alt="Album"
                  className="rounded-md w-full"
                  style={{ height: "500px" }}
                />
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 right-10 bottom-0 border-solid border-2 border-gray-500 rounded-md">
                <h4 class="font-semibold text-slate-100 bg-gray-800 p-1 ">
                  {escortprofile.displayname} - {escortprofile.state}
                </h4>
              </div>

              <div className="absolute flex justify-between transform -translate-y-1/2 right-3 top-0">
                {escortprofile.verified === 1 ? (
                  <div className="badge badge-accent ">verified</div>
                ) : (
                  <div className="badge badge-warning">unverified</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="card w-[100%] bg-base-100 shadow-xl mb-2">
            <div className="card-body">
              <h2 className="card-title">Bio !</h2>
              <div> {escortprofile.bio}</div>
            </div>
          </div>

          <div style={{ margin: "10px 0px 10px 0px" }} align="center">
            {galleryUrls.length === 0 ? null : (
              <Carousel
                images={galleryUrls.map((number) => ({
                  src: `${number}`,
                }))}
                isLoop={true}
                style={{ height: 600, width: "100%" }}
              />
            )}
          </div>

          <UnlockNumber data={escortprofile} />
          <div>
            <Table marginTop={20}>
              <Table.Head height={32}>
                <Table.TextHeaderCell>
                  PHYSICAL INFORMATION
                </Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                <Table.Row height={32}>
                  <Table.TextCell>AGE</Table.TextCell>
                  <Table.TextCell>{escortprofile.age}</Table.TextCell>
                </Table.Row>
                <Table.Row height={32}>
                  <Table.TextCell>WEIGHT</Table.TextCell>
                  <Table.TextCell>{escortprofile.weight}</Table.TextCell>
                </Table.Row>
                <Table.Row height={32}>
                  <Table.TextCell>HEIGHT</Table.TextCell>
                  <Table.TextCell>{escortprofile.height}</Table.TextCell>
                </Table.Row>
                <Table.Row height={32}>
                  <Table.TextCell>BUSTSIZE</Table.TextCell>
                  <Table.TextCell>{escortprofile.bustsize}</Table.TextCell>
                </Table.Row>
                <Table.Row height={32}>
                  <Table.TextCell>ETHNICITY</Table.TextCell>
                  <Table.TextCell>{escortprofile.ethnicity}</Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>LOOKS</Table.TextCell>
                  <Table.TextCell>{escortprofile.looks}</Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>Sexual Orientation</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.sexualorientation}
                  </Table.TextCell>
                </Table.Row>

                <Table.Row>
                  <Table.TextCell>SMOKER / DRINK</Table.TextCell>
                  <Table.VirtualBody>{escortprofile.smoker}</Table.VirtualBody>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div>
            <Table marginTop={20}>
              <Table.Head height={32}>
                <Table.TextHeaderCell>SERVICES</Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                <Table.Row height={32}>
                  <Table.TextCell>CUM IN MOUTH</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.cim}
                    {escortprofile.cim === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>CUM ON FACE</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.cof}
                    {escortprofile.cof === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>EXTRABALL</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.extraball}
                    {escortprofile.extraball === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>
                <Table.Row height={32}>
                  <Table.TextCell>ORAL</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.oral}

                    {escortprofile.oral === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>ORAL WITHOUT CONDOM</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.owo}

                    {escortprofile.owo === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>69</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.sixtynine}

                    {escortprofile.sixtynine === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>THREESOME</Table.TextCell>
                  <Table.TextCell>
                    {escortprofile.threesome}

                    {escortprofile.threesome === "Yes" ? (
                      <StatusIndicator color="success" />
                    ) : (
                      <StatusIndicator color="danger" />
                    )}
                  </Table.TextCell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div>
            <Table marginTop={20} marginBottom={20}>
              <Table.Head height={32}>
                <Table.TextHeaderCell>RATES</Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                <Table.Row height={32}>
                  <Table.TextCell>SHORT TIME</Table.TextCell>
                  <Table.TextCell>{escortprofile.shorttime}</Table.TextCell>
                </Table.Row>
                <Table.Row height={32}>
                  <Table.TextCell>OVER NIGHT</Table.TextCell>
                  <Table.TextCell>{escortprofile.overnight}</Table.TextCell>
                </Table.Row>

                <Table.Row height={32}>
                  <Table.TextCell>WEEKEND</Table.TextCell>
                  <Table.TextCell>{escortprofile.weekend_rate}</Table.TextCell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>

      <EscortsStatus />
    </>
  );
};

export default EscortProfile;
