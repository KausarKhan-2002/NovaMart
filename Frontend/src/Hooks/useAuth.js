import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../Store/userSlice";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return async (isSignup, setIsSignup, userInfo, setUserInfo, setLoading) => {
    const endpoint = isSignup ? "/auth/signup" : "/auth/login";
    const API = `${BASE_URL}${endpoint}`;

    setLoading(true);

    try {
      const res = await axios.post(API, userInfo, { withCredentials: true });

      if (!res.data.success) {
        toast.error(res.data.message || "Something went wrong");
        return;
      }

      toast.success(res.data.message || "Action successful");
      // console.log(res.data.user);

      setLoading(false);
      setIsSignup(false);
      if (!isSignup) dispatch(getUserProfile(res.data.user))

      // reset
      setUserInfo({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        DOB: "",
        cloudinaryImage: "",
      });
      
      if (!isSignup) navigate("/");
    } catch (err) {
      console.error("Auth error:", err);
      const message =
        err?.response?.data?.message || "Server error. Please try again.";
      toast.error(message);
      setLoading(false)
    }
  };
};
