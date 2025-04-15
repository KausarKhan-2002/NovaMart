import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addProduct, setProduct } from "../Store/productSlice";

export const useProductView = () => {
  const dispatch = useDispatch();

  return async () => {
    try {
      const res = await axios.get(BASE_URL + "/product/view", {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setProduct(res?.data?.products));
      } else {
        dispatch(
          addProduct({
            success: res?.data?.success,
            message: res?.data?.message,
          })
        );
      }
    } catch (err) {
      console.log(err);
      //   toast.err(er)
    }
  };
};
