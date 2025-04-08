import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../Store/userSlice";

export const useProfile = () => {
  const dispatch = useDispatch();

  return async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(getUserProfile(res?.data?.user || null));
    } catch (err) {
      console.log("Error:", err?.response?.data?.message);
    }
  };
};
