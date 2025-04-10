import React, { useState } from "react";
import productCategory from "../../Helpers/categories";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import PreviewImage from "./PreviewImage";
import { IoCloseOutline } from "react-icons/io5";

function ProductUpload({setShowForm}) {
  const [productInfo, setProductInfo] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    selling: "",
    stock: 0,
    description: "",
    images: [],
    discount: 0,
    ratings: 0,
    reviews: [],
    shippingDetails: {
      weight: "",
      dimensions: "",
      shippingFrom: "",
      estimatedDelivery: "",
      shippingCost: "",
    },
    variants: [],
  });
  const [selectCategory, setSelectCategory] = useState("mobiles");
  const [descriptionLimit, setDescriptionLimit] = useState(0);
  const [showPreviewImg, setShowpreviewimg] = useState(false);
  const limit = 200;

  // variants: [
  //   { size: "M", color: "red", stock: 10 }
  // ],

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set the limit to 100 characters
    if (name === "description") {
      const length = value.length;
      const count = length <= limit ? length : limit;
      setDescriptionLimit(count); // Always update based on new value
    }

    // Name starts with shippingDetails update it's category
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
      // Decription limit should not be more than 100 characters
      if (name === "description" && descriptionLimit >= limit) return;

      setProductInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const blobs = files.map((file) => URL.createObjectURL(file));
    setProductInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...blobs],
    }));
  };

  const handleProductUpload = (e) => {
    e.preventDefault();

    console.log(productInfo);
  };

  const handleImageDelete = (delInd) => {
    const filterImgByDelete = productInfo.images.filter(
      (img, ind) => ind != delInd
    );
    setProductInfo((prev) => ({ ...prev, images: filterImgByDelete }));
  };

  return (
    <div id="productForm" onClick={(e) => e.target.id === "productForm" && setShowForm(false)} className="fixed w-full h-[100vh] top-0 left-0 flex justify-center items-center bg-black/60 z-[999] p-4">
      <div className="w-full h-full border overflow-auto max-w-4xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Upload New Product
        </h2>

        {/* Close button to hide form */}
        <button onClick={() => setShowForm(false)} className="absolute top-[5px] right-[45px] bg-black text-white p-1 text-2xl"><IoCloseOutline /></button>

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Product Name"
            name="name"
            value={productInfo.name}
            onChange={handleChange}
          />
          <InputField
            label="Brand"
            name="brand"
            value={productInfo.brand}
            onChange={handleChange}
          />
        </div>

        <select
          onChange={(e) => setSelectCategory(e.target.value)}
          defaultValue={selectCategory}
          className="w-full focus:outline-none border border-gray-300 rounded-xl py-3 px-2"
        >
          {productCategory.map((category) => (
            <option
              className="border-none"
              key={category.id}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>

        {/* Pricing & Stock */}
        <div className="grid md:grid-cols-3 gap-4">
          <InputField
            label="Price"
            name="price"
            value={productInfo.price}
            onChange={handleChange}
          />
          <InputField
            label="Selling Price"
            name="selling"
            value={productInfo.selling}
            onChange={handleChange}
          />
          <InputField
            label="Discount (%)"
            name="discount"
            value={productInfo.discount}
            onChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Stock"
            name="stock"
            value={productInfo.stock}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">
            Product Description
          </label>
          <textarea
            name="description"
            value={productInfo.description}
            onChange={handleChange}
            className="w-full p-3 resize-none outline-none border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <p className="absolute right-2 bottom-3 text-gray-500 text-sm">
            {descriptionLimit}/{limit}
          </p>
        </div>

        {/* Shipping Details */}
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Shipping Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Weight"
            name="shippingDetails.weight"
            value={productInfo.shippingDetails.weight}
            onChange={handleChange}
          />
          <InputField
            label="Dimensions"
            name="shippingDetails.dimensions"
            value={productInfo.shippingDetails.dimensions}
            onChange={handleChange}
          />
          <InputField
            label="Shipping From"
            name="shippingDetails.shippingFrom"
            value={productInfo.shippingDetails.shippingFrom}
            onChange={handleChange}
          />
          <InputField
            label="Estimated Delivery"
            name="shippingDetails.estimatedDelivery"
            value={productInfo.shippingDetails.estimatedDelivery}
            onChange={handleChange}
          />
          <InputField
            label="Shipping Cost"
            name="shippingDetails.shippingCost"
            value={productInfo.shippingDetails.shippingCost}
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div>
          <div>
            <label className="flex border-dotted border-2 border-gray-300 justify-center items-center text-sm bg-gray-100 h-[150px] rounded-xl font-medium mb-1 text-gray-700 dark:text-white">
              <div className="flex flex-col items-center gap-1 text-gray-500">
                <RiUploadCloud2Fill size={35} />{" "}
                <p className="text-sm text-gray-400">Select product images</p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 justify-center bg-slate-100 p-2">
            {productInfo.images.map((img, ind) => (
              <div key={ind} className="relative">
                <img
                  src={img}
                  alt={`Preview ${ind}`}
                  className="w-20 h-20 sm:w-25 sm:h-25 md:w-30 md:h-30 object-cover rounded-x"
                />

                <section>
                  <button
                    onClick={() => handleImageDelete(ind)}
                    className="absolute text-sm w-[50%] flex justify-center right-0 bottom-0 bg-white opacity-80 text-red-500 p-1 cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => setShowpreviewimg(img)}
                    className="absolute text-sm w-[50%] flex justify-center left-0 bottom-0 bg-blue-100 opacity-80 text-blue-500 p-1 cursor-pointer"
                  >
                    <FaRegEye />
                  </button>
                </section>

                {showPreviewImg && (
                  <PreviewImage
                    showPreviewImg={showPreviewImg}
                    setShowpreviewimg={setShowpreviewimg}
                  />
                )}
              </div>
            ))}

            {!productInfo.images.length && (
              <p className="text-sm text-gray-500">
                No product image chosen yet
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleProductUpload}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all"
          >
            Upload Product
          </button>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 outline-none border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default ProductUpload;