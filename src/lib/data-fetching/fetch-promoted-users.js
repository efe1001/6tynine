//FIREBASE IMPORTS
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase-config";

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

export const fetchPromotedEscorts = async () => {
  //  Fetch Users data form Escorts Collection
  const escortsCollectionRef = collection(db, "escorts");
  const data = await getDocs(escortsCollectionRef);
  const results = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const escortsData = results.filter((escort) => {
    return escort.promoted === 1;
  });

  // Use the array gotten to fetch each user Profile Image
  let updatedEscortsData = [];
  for (let i = 0; i < escortsData.length; i++) {
    const email = escortsData[i].email;
    const imageFolder = email + "/";
    const imageListRef = ref(storage, imageFolder);

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          escortsData[i].url = url;
        });
      });
    });

    updatedEscortsData.push(escortsData[i]);
  }

  return updatedEscortsData;
};

export const fetchNumberedEscorts = async (numberOfEscorts) => {
  const promotedEscorts = await fetchPromotedEscorts();
  const results = chooseRandom(promotedEscorts, numberOfEscorts);

  return results;
};
