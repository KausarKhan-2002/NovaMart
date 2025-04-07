import toast from "react-hot-toast";
import validator from "validator";

const checkEmailValidation = (email) => {
  if (!email) {
    toast.error("Email address is required.");
    return true;
  }

  if (!validator.isEmail(email)) {
    console.log("chl");

    toast.error("Please enter a valid email address.");
    return true;
  }
};

const checkPasswordValidation = (password, confirmPassword) => {
  if (!password) {
    toast.error("Password is required");
    return true;
  }

  if (!validator.isStrongPassword(password)) {
    toast.error(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return true;
  }

  if (confirmPassword) {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return true;
    }
  }
};

const checkUsernameValidation = (username) => {
  if (!username) {
    toast.error("Username is required.");
    return true;
  }

  if (username.length < 4) {
    toast.error("Username must be at least 4 characters long.");
    return true;
  }
};

export const useValidator = () => {
  return (userInfo, check) => {
    const { username, email, password, confirmPassword } = userInfo;

    if (check === "login") {
      if (checkEmailValidation(email)) return true;
      if (checkPasswordValidation(password)) return true;
    }

    if (check === "all") {
      if (checkUsernameValidation(username)) return true;

      if (checkPasswordValidation(password, confirmPassword)) return true;
    }

    if (check === "next") {
      if (checkUsernameValidation(username)) return true;

      if (checkEmailValidation(email)) return true;
    }
  };
};
