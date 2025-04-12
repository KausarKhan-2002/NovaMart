import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export const useUploadProduct = () => {
  return async (productInfo) => {
    

    // Convert String into Number
    const product = {
        ...productInfo,
        price: Number(productInfo.price),
        stock: Number(productInfo.stock),
        selling: Number(productInfo.selling),
        discount: Number(productInfo.discount),
        ShippingDetails: {
            ...productInfo.shippingDetails,
            shippingCost: Number(productInfo.shippingDetails.shippingCost)
        }
    }
    console.log(product);
    

    try {
      const res = await axios.post(
        BASE_URL + "/product/upload-product",
        product,
        { withCredentials: true }
      );
      console.log(res);
      
    } catch (err) { 
      console.log("Error:", err.message);
    }
  };
};
