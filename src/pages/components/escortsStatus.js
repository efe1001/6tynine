import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AVATAR from "../../images/avatar.png";
import { Nudge } from "evergreen-ui";

import { Button, MoreIcon, Spinner, Badge } from "evergreen-ui";

//FIREBASE IMPORTS
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase-config";

const EscortsStatus = () => {
  const history = useHistory();
  const [escortsData, setEscortsData] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [escortNum, setEscortNum] = useState();

  const escortsCollectionRef = collection(db, "escorts");

  const escortsLoading = async () => {
    const data = await getDocs(escortsCollectionRef);

    const results = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const escortsData = results.filter((escort) => {
      return escort.promoted === 1;
    });

    setEscortNum(escortsData.length);

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

    if (updatedEscortsData.length < 13) {
      const displayEscorts = updatedEscortsData;
      setEscortsData(displayEscorts);
    } else {
      const displayEscorts = chooseRandom(updatedEscortsData, 13);
      setEscortsData(displayEscorts);
    }
  };

  useEffect(() => {
    escortsLoading();
  }, []);

  if (!escortsData) {
    return (
      <div align="center" style={{ margin: "20px" }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mb-2 mx-1">
      <div className="flex  overflow-x-scroll auto-scroll">
        {escortsData.slice(0, 13).map((escort) => (
          <Link to={`/escorts/${escort.id}`}>
            <div className="avatar online m-1">
              <div className="w-24 rounded-full">
                <img src={escort.url || AVATAR} alt="Promoted" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EscortsStatus;
