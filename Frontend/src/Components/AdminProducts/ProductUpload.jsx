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
import Spinner from "../../Shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../Utils/constants";
import { addImage, deleteImage } from "../../Store/productSlice";
import { useUpdateProduct } from "../../Hooks/useUpdateProduct";

function ProductUpload({ setShowForm, productEditId, upload }) {
  const products = useSelector((store) => store.products);
  const product = !upload
    ? products.find((p) => p._id === productEditId)
    : null

  const [productInfo, setProductInfo] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    brand: product?.brand || "",
    category: product?.category || "airpods",
    stock: product?.stock || 0,
    images: product?.images || [],
    reviews: product?.reviews || [],
    selling: product?.selling || "",
    discount: product?.discount || 0,
    shippingDetails: {
      weight: product?.shippingDetails?.weight || "",
      dimensions: product?.shippingDetails?.dimensions || "",
      shippingFrom: product?.shippingDetails?.shippingFrom || "",
      shippingCost: product?.shippingDetails?.shippingCost || "",
    },
  });
  const [descriptionLimit, setDescriptionLimit] = useState(
    product?.description?.length || 0
  );
  const [showPreviewImg, setShowpreviewImg] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [sellingPrice, setSellingPrice] = useState(productInfo.price);
  const [loader, setLoader] = useState(false);
  const [spin, setSpin] = useState(false);
  const [updatedImgFiles, setUpdatedImgFiles] = useState([]);
  const cloudinaries = useMultipleCloudinaries();
  const uploadProduct = useUploadProduct();
  const updateProduct = useUpdateProduct();
  const dispatch = useDispatch();
  const limit = 400;

  useEffect(() => {
    setProductInfo((prev) => ({
      ...prev,
      selling: sellingPrice,
    }));
  }, [productInfo.price, productInfo.discount]);

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
      if (name === "description" && descriptionLimit >= limit) return;

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
    console.log(file);

    const url = URL.createObjectURL(file);
    console.log(url);

    if (upload) {
      setImgFiles((prev) => [...prev, file]);
    } else {
      dispatch(addImage({ productId: product._id, url }));
      setUpdatedImgFiles((prev) => [...prev, file]);
    }
    setProductInfo((prev) => ({
      ...prev,
      images: [...prev.images, { url, public_id: null }],
    }));
  };
 
  const handleProductUpload = async (e) => {
    e.preventDefault();

    // Only cloudinary image hold while updating
    const clouds =
      !upload &&
      product.images.filter((img) =>
        img.url.includes("https://res.cloudinary.com/")
      );

    const imgUrls = await cloudinaries(
      upload ? imgFiles : updatedImgFiles,
      setLoader
    );

    if (updatedImgFiles.length > 0 && !imgUrls) return;

    // During uploading (productInfo) & during updating (productInfo + current ProductId)
    const productObj = upload ? productInfo : {...productInfo, _id: product._id};

    const finalProductInfo = {
      ...productObj,
      images: upload
        ? imgUrls
        : updatedImgFiles.length
        ? [...clouds, ...imgUrls]
        : productInfo.images,
    };

    upload && uploadProduct(finalProductInfo, setLoader);
    !upload && updateProduct(finalProductInfo, setLoader);
  };

  const handleImageDelete = (delInd, img) => {
    const filterBlobs = productInfo.images.filter((img, ind) => ind != delInd);
    const publicId = img?.public_id;
    console.log(delInd, img);

    const deleteImgFromStateOrRedux = () => {
      // Delete image during updating
      !upload &&
        dispatch(deleteImage({ productId: product._id, index: delInd }));

      // Delet image during uploading
      if (upload) {
        const filterFiles = imgFiles.filter((file, ind) => ind != delInd);
        setProductInfo((prev) => ({ ...prev, images: filterBlobs }));
        setImgFiles(filterFiles);
      }
    };

    const deleteImageFromDB = async () => {
      setSpin(true);

      try {
        const res = await axios.delete(
          BASE_URL + `/product/${product._id}/image/${publicId}`,
          { withCredentials: true }
        );
        console.log(res);

        deleteImgFromStateOrRedux();
      } catch (err) {
        console.log(err.message);
      } finally {
        setSpin(false);
      }
    };

    !publicId && deleteImgFromStateOrRedux();

    publicId && deleteImageFromDB();
  };

  return (
    <div
      id="productForm"
      onClick={(e) => e.target.id === "productForm" && setShowForm(false)}
      className="fixed w-full h-[100vh] top-0 left-0 flex justify-center items-center bg-black/60 z-[999] p-4"
    >
      <div className="w-full h-full border overflow-auto max-w-4xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          {product ? "Update Your Product" : "Upload New Product"}
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
        <PricingStock
          productInfo={productInfo}
          handleChange={handleChange}
          sellingPrice={sellingPrice}
          setSellingPrice={setSellingPrice}
        />

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
          setShowpreviewImg={setShowpreviewImg}
          spin={spin}
          product={product}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleProductUpload}
            type="submit"
            className="flex gap-2 items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full md:w-fit rounded-xl transition-all cursor-pointer"
          >
            {loader && <Spinner />}
            {product ? "Update product" : "Upload Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductUpload;
