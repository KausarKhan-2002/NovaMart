import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export const useProductCollection = () => {
  return async (productCategory, setCollection) => {
    try {
      const res = await axios.get(
        BASE_URL + `/product/collection/${productCategory}`
      );
      if (res.data?.products) {
        setCollection(res.data.products)
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};