import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export const useAllUsers = () => {
  return async (setUsers) => {
    try {
      const res = await axios.get(BASE_URL + "/credential/users", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
};
