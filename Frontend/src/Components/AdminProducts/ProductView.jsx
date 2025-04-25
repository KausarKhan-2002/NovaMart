import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProductView } from "../../Hooks/useProductView";
import Slider from "react-slick";
import { BsThreeDotsVertical } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminProductShimmer from "../ShimmerUI/AdminProductShimmer";
import NoProductShimmer from "../ShimmerUI/NoProductShimmer";
import ProductOption from "./ProductOption";
import { FaCrown } from "react-icons/fa6";
import { GiDiamondTrophy } from "react-icons/gi";
import { FaCrown as Premium } from "react-icons/fa";

function ProductView({ setShowForm, setProductEditId, setUpload }) {
  const [currentId, setCurrentId] = useState(null);

  const products = useSelector((store) => store.products);
  console.log(products);

  const user = useSelector((store) => store.user);
  const productVisible = useProductView();

  useEffect(() => {
    if (!products.length) productVisible();
  }, [products, productVisible]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    // autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleEdit = (productId) => {
    setShowForm(true);
    setProductEditId(productId);
  };

  if (!products.length && !["Admin", "Moderator"].includes(user?.roles))
    return <AdminProductShimmer />;
  if (
    products[0]?.success === false &&
    !["Admin", "Moderator"].includes(user?.role)
  )
    return <NoProductShimmer />;

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative group bg-white border border-gray-200  rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          {/* Image / Slider */}
          {product?.images?.length > 1 ? (
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
          ) : (
            <img
              src={product?.images[0]?.url}
              alt={product?.name}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Dots to show and hide option */}
          <button
            id="productOptions"
            onClick={() =>
              setCurrentId((prev) =>
                prev === product._id ? null : product._id
              )
            }
            className="absolute top-1 right-0 cursor-pointer text-xl z-20 p-2"
          >
            <BsThreeDotsVertical />
          </button>

          {/* Show option to handle product */}
          <ProductOption
            user={user}
            handleEdit={handleEdit}
            setUpload={setUpload}
            isCurrentOption={product._id === currentId}
            currentId={currentId}
          />

          {/* sponsored card tik */}
          {product?.isSponsored &&
            (["6 Months", "1 Year", "2 Year"].includes(
              product.sponsorshipDetails.planType
            ) ? (
              <Premium className="absolute top-1 left-1 text-xl bg-blue-500 text-slate-100 p-1 rounded-full" />
            ) : (
              <FaCrown className="absolute top-1 left-1 text-xl bg-emerald-500 text-slate-100 p-1 rounded-full" />
            ))}

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
              {product.name} ({product?.brand})
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2 mt-1">
              {product?.description?.slice(0, 100)}...
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-green-600 font-bold">
                ₹{product?.selling}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{product?.price}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Stock: {product?.stock} | Category: {product.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductView;
