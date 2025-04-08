import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../Utils/constants";
import toast from "react-hot-toast";
import { removeProfile } from "../Store/userSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  
  return async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res.data.message);
      dispatch(removeProfile());
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
};
