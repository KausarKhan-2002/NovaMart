import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProduct } from "../Store/productSlice";

export const useProductView = () => {
    const dispatch = useDispatch()

  return async () => {
    try {
      const res = await axios.get(BASE_URL + "/product/view", {
        withCredentials: true,
      });
      dispatch(setProduct(res?.data?.products))
    } catch (err) {
      console.log(err);
    //   toast.err(er)
    }
  };
};