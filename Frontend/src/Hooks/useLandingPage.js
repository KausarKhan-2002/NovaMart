import { LANDING_ROUTES } from "../Utils/constants";
import axios from "axios";

export const useLandingPage = () => {
  return async (setCategories, setBanners, setDiscountProducts) => {
    try {
      const res = await Promise.all(
        LANDING_ROUTES.map((route) => axios.get(route))
      );
      const data = res.map((r) => r.data);
      // console.log("landing", data);

      setCategories(data[0].categories);
      setBanners(data[1].products);
      setDiscountProducts(data[2].products);
    } catch (err) {
      console.log(err.message);
    }
  };
};
