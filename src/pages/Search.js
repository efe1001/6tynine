import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import QuickSearch from "../components/QuickSearch";
import { IconButton } from "evergreen-ui";

//FIREBASE IMPORTS
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase-config";

import {
  Badge,
  Spinner,
  Alert,
  Button,
  HomeIcon,
  CircleArrowLeftIcon,
} from "evergreen-ui";
import SearchList from "./components/SearchList";
import Pagination from "./components/Pagination";

const Search = () => {
  const history = useHistory();
  const [escortsData, setEscortsData] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [isFiltering, setIsFiltering] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const bsize = queryParams.get("bsize");
  const prenium = queryParams.get("prenium");
  const verified = queryParams.get("verified");
  const displayname = queryParams.get("displayname");

  const escortsCollectionRef = collection(db, "escorts");

  const escortsLoading = async () => {
    const data = await getDocs(escortsCollectionRef);
    const escortsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

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

    let uploadEscorts = updatedEscortsData;

    if (state !== "all") {
      uploadEscorts = updatedEscortsData.filter(
        (escort) => escort.state === state
      );
    }

    if (bsize !== "all") {
      uploadEscorts = uploadEscorts.filter(
        (escort) => escort.bustsize === bsize
      );
    }

    if (bsize !== "all") {
      uploadEscorts = uploadEscorts.filter(
        (escort) => escort.bustsize === bsize
      );
    }

    if (verified === "all") {
      uploadEscorts = uploadEscorts.filter((escort) => escort.verified === 1);
    }

    if (displayname !== "all") {
      uploadEscorts = uploadEscorts.filter(
        (escort) =>
          escort.displayname.trim().toLowerCase() ===
          displayname.trim().toLowerCase()
      );
    }

    setEscortsData(uploadEscorts);
    setIsFiltering(false);
  };

  useEffect(() => {
    escortsLoading();
  }, [displayname, state, bsize]);

  if (!escortsData) {
    return (
      <div align="center" style={{ margin: "20px" }}>
        <Spinner />
      </div>
    );
  }

  const currentEscorts = escortsData.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div align="center" className="mt-3">
        <IconButton
          icon={HomeIcon}
          intent="success"
          marginRight={5}
          onClick={() => {
            history.push("/");
          }}
        />
        <IconButton
          intent="danger"
          icon={CircleArrowLeftIcon}
          marginRight={5}
          onClick={() => {
            history.goBack();
          }}
        />
      </div>

      <div className="card w-[100%] bg-base-100 shadow-xl mb-5">
        <div className="card-body">
          <div>
            Search Filter - Returned {escortsData.length} Escorts
            <br />
            <Badge color="purple">DISPLAY NAME : {displayname}</Badge>,
            <Badge color="green">LOCATION : {state}</Badge>,
            <Badge color="blue">BUST SIZE : {bsize}</Badge>,
            <Badge color="red">PREMIUM : {prenium}</Badge>,
            <Badge color="yellow">VERIFIED : {verified}</Badge>
          </div>
        </div>
      </div>

      {currentPage !== 1 && (
        <>
          <Pagination
            totalPosts={escortsData.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}

      <SearchList currentEscorts={currentEscorts} />
      <Pagination
        totalPosts={escortsData.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Search;
