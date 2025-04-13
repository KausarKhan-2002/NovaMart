import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProductView } from "../../Hooks/useProductView";
import Slider from "react-slick";
import { FiEdit } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductView({setShowForm, setProductEditId}) {
  const products = useSelector((store) => store.products);
  const productView = useProductView();

  useEffect(() => {
    if (!products.length) productView();
  }, []);

  if (!products.length) return <p>Loading...</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleEdit = (productId) => {
    console.log("Edit product:", productId);
    // Navigate or open modal logic here
    setShowForm(true)
    setProductEditId(productId)

  };

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative group bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          {/* Image Slider Inside the Card */}
          <Slider {...sliderSettings}>
            {product.images.map((img) => (
              <div key={img._id}>
                <img
                  src={img.url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </Slider>

          {/* Edit Button */}
          <button
            onClick={() => handleEdit(product._id)}
            className="hidden group-hover:block absolute top-3 right-3 bg-gray-100 p-2 rounded-full text-gray-700 hover:text-blue-600 cursor-pointer"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
              {product.name} ({product.brand})
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2 mt-1">
              {product.description.slice(0, 100)}...
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-green-600 font-bold">
                ₹{product.selling}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{product.price}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Stock: {product.stock} | Category: {product.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductView;