import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateProduct } from "../Store/productSlice";

export const useUpdateProduct = () => {
  // const products =
  const dispatch = useDispatch();

  return async (productData, setLoader) => {
    
    if (
      !productData.name ||
      !productData.description ||
      !productData.price ||
      !productData.brand ||
      !productData.category ||
      !productData.stock ||
      !productData.images.length ||
      !productData.shippingDetails
    ) {
      toast.error("All fields are required and cannot be empty.");
      setLoader(false);
      return;
    }

    try {
      setLoader(true);

      const response = await axios.patch(
        `${BASE_URL}/product/edit/${productData._id}`,
        productData,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log(response);
        if (response?.data?.product) {
          dispatch(updateProduct(response?.data?.product));
        }
        toast.success("Product updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };
};
