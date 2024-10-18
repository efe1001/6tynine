import { db } from "../../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { getUser } from "../data-fetching/users-data";

export const removePromotion = async (id) => {
  const userDoc = doc(db, "escorts", id);
  const newFields = {
    promoted: 0,
    promotedEnd: 0,
  };
  const result = await updateDoc(userDoc, newFields)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      // If an error occurred, return "Failed"
      return "failed";
    });

  return result;
};
