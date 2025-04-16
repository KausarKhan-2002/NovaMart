import React, { useEffect, useState } from "react";
import { useProductCollection } from "../Hooks/useProductCollection";
import { useParams } from "react-router-dom";
import ProductImageSlider from "../Helpers/ProductImageSlider";
import CollectionShimmer from "../Components/ShimmerUI/CollectionShimmer";

function ProductCollection() {
  const [collection, setCollection] = useState([]);
  const productCollection = useProductCollection();
  const { categoryName } = useParams();

  useEffect(() => {
    productCollection(categoryName, setCollection);
  }, [categoryName]);

  if (collection.length === 0) return <CollectionShimmer />;

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-2xl font-medium mb-6 dark:text-white capitalize text-slate-800">
        Products in {categoryName}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {collection.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <ProductImageSlider images={product.images} />
            {/* <img
              src={product.images?.[0]?.url || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-48 object-cover"
            /> */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name.capitalize()}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.brand}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category: {product.category}
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                ₹{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCollection;