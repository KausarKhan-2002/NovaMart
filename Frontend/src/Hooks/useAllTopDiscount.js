import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export const useAllTopDiscount = () => {
  return async (setDiscountProducts) => {
    try {
      const response = await axios.get(BASE_URL + "/product/top-discount/all");
      setDiscountProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };
};
