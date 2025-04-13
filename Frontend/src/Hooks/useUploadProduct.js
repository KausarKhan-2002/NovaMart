import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { toast } from "react-hot-toast";

export const useUploadProduct = () => {
  return async (productInfo, setLoader, setProductInfo) => {
    setLoader(true);

    // Convert String into Number which are required as a number in schema
    const product = {
      ...productInfo,
      price: Number(productInfo.price),
      stock: Number(productInfo.stock),
      selling: Number(productInfo.selling),
      discount: Number(productInfo.discount),
      ShippingDetails: {
        ...productInfo.shippingDetails,
        shippingCost: Number(productInfo.shippingDetails.shippingCost),
      },
    };

    try {
      const res = await axios.post(
        BASE_URL + "/product/upload-product",
        product,
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res.data.message);
      // setProductInfo({
      //   name: "",
      //   description: "",
      //   price: "",
      //   brand: "",
      //   category: "",
      //   stock: 0,
      //   images: [],
      //   reviews: [],
      //   selling: "",
      //   discount: 0,
      //   shippingDetails: {
      //     weight: "",
      //     dimensions: "",
      //     shippingFrom: "",
      //     shippingCost: "",
      //   },
      // });
    } catch (err) {
      console.log("Error:", err);
      toast.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };
};
