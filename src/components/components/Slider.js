import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
// import Carousel from "carousel-react-rcdev";
import SliderProps from "./SliderProps";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { Spinner } from "evergreen-ui";
import AVATAR from "../../images/avatar.png";

//FIREBASE IMPORTS
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase-config";

const Slider = (props) => {
  const history = useHistory();
  const [escortsData, setEscortsData] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const escortsCollectionRef = collection(db, "escorts");
  const escortsLoading = async () => {
    const data = await getDocs(escortsCollectionRef);
    const results = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const escortsData = results.filter((escort) => {
      return escort.promoted === 1;
    });

    let updatedEscortsData = [];
    for (let i = 0; i < escortsData.length; i++) {
      const email = escortsData[i].email;
      const imageFolder = email + "/";
      const imageListRef = ref(storage, imageFolder);

      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            escortsData[i].url = url;
            setImgUrl(url);
          });
        });
      });

      updatedEscortsData.push(escortsData[i]);
    }

    const chooseRandom = (arr, num = 1) => {
      const res = [];
      for (let i = 0; i < num; ) {
        const random = Math.floor(Math.random() * arr.length);
        if (res.indexOf(arr[random]) !== -1) {
          continue;
        }
        res.push(arr[random]);
        i++;
      }
      return res;
    };

    if (updatedEscortsData.length < 15) {
      const displayEscorts = updatedEscortsData;
      setEscortsData(displayEscorts);
    } else {
      const displayEscorts = chooseRandom(updatedEscortsData, 15);
      setEscortsData(displayEscorts);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    escortsLoading();
  }, []);

  if (isLoading) {
    return (
      <div align="center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "hsl(252, 30%, 17%)" }}>
        <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
          {escortsData.map((est) => (
            <Link to={`/escorts/${est.id}`} key={est.id}>
              <SliderProps
                name={est.displayname}
                img={est.url}
                key={est.id}
                location={est.state}
                verified={est.verified}
                onClick={() => {
                  history.push(`/escorts/${est.email}`);
                }}
              />
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Slider;

{
  /* <Carousel autoPlay={true}>
          {escortsData.map((escort) => (
            <SliderProps
              key={escort.id}
              img={escort.url}
              name={escort.name}
              location={escort.state}
            />
          ))}
        </Carousel> */
}
