import React from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateProduct } from "../Store/productSlice";

export const useSponsorship = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return async (productId, sponsorship, setLoader) => {
    try {
      console.log(sponsorship);

      setLoader(true);
      const res = await axios.put(
        BASE_URL + `/product/sponsorship/${productId}`,
        { sponsorshipDetails: sponsorship },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(updateProduct(res.data.product))
      toast.success("this product is now sponsored");
      navigate("/admin-panel/all-products");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };
};
