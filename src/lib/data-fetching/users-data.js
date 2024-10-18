import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import { getDocs, collection } from "firebase/firestore";
import { storage } from "../../firebase-config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { db } from "../../firebase-config";

// Authentication Context
const email = localStorage.getItem("email");

// <! ------------------- UserData ------------------- >

// Escorts Collection
const escortsCollectionRef = collection(db, "escorts");

export const getUser = async () => {
  const data = await getDocs(escortsCollectionRef);
  const escortsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
  const results = escortsData.filter((escort) => {
    return escort.email === email;
  });

    return results;
};

// <! ------------------- User Profile Picture ------------------- >

const imageFolder = email + "/";
const imagesListRef = ref(storage, imageFolder);

export const getUserImages = async () => {
  const urlImg = "";
  const data = await listAll(imagesListRef);
  console.log(data);

  const result = data.items.forEach((item) => {
    getDownloadURL(item).then((url) => {
      console.log(url);
      urlImg = url;
      return url;
    });
  });

  return urlImg;
};
