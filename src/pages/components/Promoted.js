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

const Promoted = () => {
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

    if (updatedEscortsData.length < 20) {
      const displayEscorts = updatedEscortsData;
      setEscortsData(displayEscorts);
    } else {
      const displayEscorts = chooseRandom(updatedEscortsData, 20);
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
    <div className="promoted">
      <div class="flex items-center space-x-2 text-base p-5 bg-red">
        <h4 class="font-semibold text-slate-100 p-2 rounded-md  bg-gray-800">
          Promoted Escorts
        </h4>
        <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {escortNum}
        </span>
        <Nudge isShown={true}>
          <a href="https://api.whatsapp.com/send?phone=2348119562376">
            <b className="text-sm text-slate-100">Appear here ??</b>
          </a>
        </Nudge>
      </div>

      <div className="promoted-escorts">
        {escortsData.slice(0, 20).map((escort) => (
          <Link to={`/escorts/${escort.id}`}>
            <div className="px-5 mb-5 relative" key={escort.id}>
              <div className="w-full">
                <img
                  src={escort.url || AVATAR}
                  alt="Album"
                  className="rounded-md w-full"
                  style={{ height: "500px" }}
                />
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 right-10 bottom-0 border-solid border-2 border-gray-500 rounded-md">
                <h4 class="font-semibold text-slate-100 bg-gray-800 p-1 ">
                  {escort.displayname} - {escort.state}
                </h4>
              </div>

              <div className="absolute flex justify-between transform -translate-y-1/2 right-3 top-0">
                <div className="badge badge-accent ">verified</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div align="center" style={{ padding: "10px" }}>
        <Button
          marginRight={10}
          intent="danger"
          fullWidth
          iconBefore={MoreIcon}
          appearance="primary"
          onClick={() => {
            history.push(
              "/search?state=all" +
                "&bsize=all" +
                "&prenium=all" +
                "&verified=all" +
                "&displayname=all"
            );
          }}
        >
          SEE MORE
        </Button>
      </div>
    </div>
  );
};

export default Promoted;
