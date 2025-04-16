import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export const useProductCategories = () => {
  return async (setCategories) => {
    try {
      const res = await axios.get(BASE_URL + "/product/categories", {withCredentials: true});
    //   console.log(res?.data?.categories);
      setCategories(res?.data?.categories)
    } catch (err) {
      console.log(err.message);
    }
  };
};
