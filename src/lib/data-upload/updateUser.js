import { db } from "../../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { getUser } from "../data-fetching/users-data";

export const updateUserInfo = async (
  state,
  age,
  phone,
  whatsapp,
  short,
  overnight,
  weekend,
  bio,
  id
) => {
  const userDoc = doc(db, "escorts", id);
  const newFields = {
    age,
    phone_number_1: phone,
    whatsapp_number: whatsapp,
    state,
    shorttime: short,
    overnight,
    bio,
    weekend_rate: weekend,
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
