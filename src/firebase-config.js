import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "jahangout-bdf6f.firebaseapp.com",
  projectId: "jahangout-bdf6f",
  storageBucket: "jahangout-bdf6f.appspot.com",
  messagingSenderId: "456361858420",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-V32TJZM9MG",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
