import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ProductInfo from "./ProductInfo";
import ProductCategory from "./ProductCategory";
import PricingStock from "./PricingStock";
import ProductDescription from "./ProductDescription";
import ShippingDetails from "./ShippingDetails";
import AddImagesAndView from "./AddImagesAndView";
import { useMultipleCloudinaries } from "../../Hooks/useCloudinary";
import { useUploadProduct } from "../../Hooks/useUploadProduct";
import Spinner from "../../Helpers/Spinner";

function ProductUpload({ setShowForm }) {
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "airpods",
    stock: 0,
    images: [],
    reviews: [],
    selling: "",
    discount: 0,
    shippingDetails: {
      weight: "",
      dimensions: "",
      shippingFrom: "",
      shippingCost: "",
    },
  });
  const [descriptionLimit, setDescriptionLimit] = useState(0);
  const [showPreviewImg, setShowpreviewimg] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [sellingPrice, setSellingPrice] = useState(productInfo.price);
  const [loader, setLoader] = useState(false);
  const cloudinaries = useMultipleCloudinaries();
  const uploadProduct = useUploadProduct();
  const limit = 400;
  // console.log(productInfo);

  useEffect(() => {
    setProductInfo(prev => ({
      ...prev,
      selling: sellingPrice
    }))
  }, [productInfo.price, productInfo.discount])
  

  const handleChange = (e) => {
  const { name, value } = e.target;

  // Handle description limit
  if (name === "description") {
    const length = value.length;
    const count = length <= limit ? length : limit;
    setDescriptionLimit(count);
  }

  // Update shippingDetails fields
  if (name.startsWith("shippingDetails.")) {
    const field = name.split(".")[1];
    setProductInfo((prev) => ({
      ...prev,
      shippingDetails: {
        ...prev.shippingDetails,
        [field]: value,
      },
    }));
  } else {

    // Avoid typing over limit
    if (name === "description" && descriptionLimit >= limit) return
    

    // Update the main fields
    setProductInfo((prev) => {
      const updated = { ...prev, [name]: value };

      // Dynamically calculate and update sellingPrice right here
      const price = parseFloat(updated.price) || 0;
      const discount = parseFloat(updated.discount) || 0;
      const discountAmount = (price * discount) / 100;
      setSellingPrice(price - discountAmount);

      return updated;
    });
  }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFiles((prev) => [...prev, file]);
    const blob = URL.createObjectURL(file);
    setProductInfo((prev) => ({
      ...prev,
      images: [...prev.images, { url: blob, public_id: null }],
    }));
  };

  const handleProductUpload = async (e) => {
    e.preventDefault();

    const imgUrls = await cloudinaries(imgFiles, setLoader);
    console.log(imgUrls);

    const finalProductInfo = {
      ...productInfo,
      images: imgUrls,
    };

    uploadProduct(finalProductInfo, setLoader, setProductInfo);
  };

  const handleImageDelete = (delInd) => {
    const filterImgByDelete = productInfo.images.filter(
      (img, ind) => ind != delInd
    );
    setProductInfo((prev) => ({ ...prev, images: filterImgByDelete }));
  };

  return (
    <div
      id="productForm"
      onClick={(e) => e.target.id === "productForm" && setShowForm(false)}
      className="fixed w-full h-[100vh] top-0 left-0 flex justify-center items-center bg-black/60 z-[999] p-4"
    >
      <div className="w-full h-full border overflow-auto max-w-4xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Upload New Product
        </h2>

        {/* Close button to hide form */}
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-[5px] right-[12.5%] bg-black text-white p-1 text-2xl cursor-pointer z-10"
        >
          <IoCloseOutline />
        </button>

        {/* Product Info */}
        <ProductInfo productInfo={productInfo} handleChange={handleChange} />

        {/* Product category */}
        <ProductCategory setProductInfo={setProductInfo} />

        {/* Pricing & Stock */}
        <PricingStock productInfo={productInfo} handleChange={handleChange} sellingPrice={sellingPrice} setSellingPrice={setSellingPrice} />

        {/* Description */}
        <ProductDescription
          productInfo={productInfo}
          handleChange={handleChange}
          limit={limit}
          descriptionLimit={descriptionLimit}
        />

        {/* Shipping Details */}
        <ShippingDetails
          productInfo={productInfo}
          handleChange={handleChange}
        />

        {/* Add image and view */}
        <AddImagesAndView
          productInfo={productInfo}
          handleImageChange={handleImageChange}
          handleImageDelete={handleImageDelete}
          showPreviewImg={showPreviewImg}
          setShowpreviewimg={setShowpreviewimg}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleProductUpload}
            type="submit"
            className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full md:w-fit rounded-xl transition-all cursor-pointer"
          >
            {loader && <Spinner />} Upload Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductUpload;
