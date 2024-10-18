export const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const isPassword = (password) => {
  if (password.length < 7 || password.length > 15) {
    return false;
  } else {
    return true;
  }
};
export const isEmptyDisplayName = (value) => {
  if (value.length < 4 || value.length > 20) {
    return false;
  } else {
    return true;
  }
};
export const isPhoneNumber = (value) => {
  if (value.length === 11) {
    return "true";
  } else {
    return "false";
  }
};
