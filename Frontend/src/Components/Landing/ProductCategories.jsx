import { preloadComponent } from "../../Helpers/preLoad";
import ProductCategoriesShimmer from "../ShimmerUI/ProductCategoriesShimmer";
import { Link } from "react-router-dom";

function ProductCategories({ categories }) {
  if (categories.length === 0) return <ProductCategoriesShimmer />;

  return (
    <div className="py-5 px-4 md:px-5 lg:px-16">
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 gap-y-3 justify-items-center">
        {categories.map((category) => (
          <Link
            onMouseEnter={preloadComponent}

            to={`/collection/${category.product?.category}`}
            key={category.product?._id}
            className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <img
                src={category?.product.images[0]?.url}
                alt={category.product?.category}
                className="w-full h-full object-center object-scale-down"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 capitalize text-center">
              {category.product?.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCategories;
