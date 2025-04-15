import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeAllProducts } from "../Store/productSlice";

export const useUploadProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);

  return async (productInfo, setLoader) => {
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
      console.log(res.data.product);
      if (products.length === 1 && products[0]?.success === false) {
        dispatch(removeAllProducts());
        dispatch(addProduct(res.data.product));
      }
      else {
        dispatch(addProduct(res.data.product));
      }
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
      toast.error("error");
    } finally {
      setLoader(false);
    }
  };
};
