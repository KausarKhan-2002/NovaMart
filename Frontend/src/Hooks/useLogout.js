import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../Utils/constants";
import toast from "react-hot-toast";
import { removeProfile } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  return async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(removeProfile());
      navigate("/")
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
};
