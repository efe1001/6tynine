import { uploadBytes, deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { v4 } from "uuid";

const email = localStorage.getItem("email");

export const uploadGalleryImages = async (images) => {
  let error = "";
  for (let i = 0; i < images.length; i++) {
    const imageRef = ref(storage, `${email}/gallery/${images[i].name + v4()}`);

    const result = await uploadBytes(imageRef, images[i])
      .then(() => {
        error = "success";
      })
      .catch((error) => {
        error = "failed";
      });
  }

  return error;
};
