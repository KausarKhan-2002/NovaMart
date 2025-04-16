import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { updateTags } from "../Store/productSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateTags = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return async (tags, productId, setLoader) => {
    console.log(tags);

    try {
      setLoader(true);
      const res = await axios.put(
        BASE_URL + `/product/update/tags/${productId}/feature`,
        { tags },
        { withCredentials: true }
      );

      console.log(res);
      if (res.data?.product?.tags) {
        dispatch(
          updateTags({ productId, updateTags: res.data?.product?.tags })
        );
      }
      navigate("/admin-panel/all-products")
      toast.success(res.data?.message || "Tasks updated successfully");
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoader(false);
    }
  };
};
