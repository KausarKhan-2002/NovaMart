import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export const useBannerImages = () => {
  return async (setBanners) => {
    try {
      const res = await axios.get(BASE_URL + "/product/banner");
      if (res.data?.products) {
        setBanners(res.data.products);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};