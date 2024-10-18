export const validateProfileImage = (image) => {
  // Image type check
  if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    const error = "Wrong File Type";
    return error;
  }

  // Image size check
  if (image.size > 5000000) {
    const error = "File too Large - Upload a file less than 5MB";
    return error;
  }

  return "success";
};
