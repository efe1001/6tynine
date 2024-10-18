import { uploadBytes, deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { v4 } from "uuid";

const email = localStorage.getItem("email");

export const deleteImage = async (image) => {
  const desertRef = ref(storage, image);

  if (desertRef._location.path_) {
    const status = await deleteObject(desertRef)
      .then(() => {
        // If deletion of Image was successful, return "Success"
        return "success";
      })
      .catch((error) => {
        // If an error occurred, return "Failed"
        return "failed";
      });

    return status;
  }
};

const imageUpload = async (image) => {
  if (!email) {
    return "User Not Logged In";
  }

  const imageRef = ref(storage, `${email}/${image.name + v4()}`);

  const status = await uploadBytes(imageRef, image)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      // If an error occurred, return "Failed"
      return "failed";
    });

  return status;
};

export const uploadImage = async (newImage, oldImage) => {
  // Delete Old profile Image
  const status = await deleteImage(oldImage);

  // if (status !== "success") {
  // If old picture couldn't be deleted return failed
  //   return "failedpro";
  // }

  // If old profile picture was deleted successfully deleted, upload new Image;
  const result = await imageUpload(newImage);

  return result;
};
