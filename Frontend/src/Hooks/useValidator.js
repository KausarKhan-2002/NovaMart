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

const checkPasswordValidation = (password, confirmPassword, auth) => {
  console.log(password, confirmPassword);

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

  if (auth === "signup") {
    if (!confirmPassword) {
      toast.error("Confirm password is required.");
      return true;
    }
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

  if (username.length <= 4) {
    toast.error("Username must be at least 4 characters long and maximum 30.");
    return true;
  }

  if (username.length >= 30) {
    toast.error("Username size limit exception, must be lesser than 30.");
    return true;
  }
};

export const useValidator = () => {
  return (userInfo, check) => {
    const { username, email, password, confirmPassword, gender, DOB } =
      userInfo;

    if (check === "login") {
      if (checkEmailValidation(email)) return true;
      if (checkPasswordValidation(password)) return true;
    }

    if (check === "all") {
      if (checkUsernameValidation(username)) return true;

      if (checkPasswordValidation(password, confirmPassword, "signup"))
        return true;

      if (!gender) {
        toast.error("Gender is required.");
        return true;
      }

      if (!DOB) {
        toast.error("Date of birth is required.");
        return true;
      }
    }

    if (check === "next") {
      if (checkUsernameValidation(username)) return true;

      if (checkEmailValidation(email)) return true;
    }
  };
};
