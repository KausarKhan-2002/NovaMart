import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useAllTopDiscount } from "../../Hooks/useAllTopDiscount";
import { Link } from "react-router-dom";

function TopDiscountProduct({ discountProducts }) {

  if (discountProducts.length === 0) return "Loading...";

  return (
    <section className="relative w-full  mt-16 px-6 py-6 overflow-hidden">
      {/* Header */}
      <div className="relative z-20">
        <h1 className="font-semibold text-slate-800 text-base md:text-2xl">
          BEST DISCOUNT FOR YOU
        </h1>
        <Link
         to="/top-discount"
          className="text-sm w-[135px] px-2 py-1 md:text-base md:w-[160px] md:px-4 md:py-2 bg-[#47473f]  text-[#dbdbd3] mt-3 mb-10 cursor-pointer hover:bg-[#3a3a34] hover:shadow-lg  flex items-center justify-center  gap-1 rounded-md"
        >
          Explore More <MdOutlineArrowRightAlt className="text-2xl" />
        </Link>
      </div>

      {/* Half Bg Layer (Behind Cards, Above Section) */}
      <div className="absolute w-full h-[300px] bg-[#d6d19c] top-0 left-0 z-10" />

      {/* Discount Cards (Over the Half Bg) */}
      <div className="relative z-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {discountProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800 truncate">
                {product.name.capitalize()}
              </h2>

              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 line-through">
                    ₹{product.price}
                  </p>
                  <p className="text-md font-bold text-green-600">
                    ₹{product.selling}
                  </p>
                </div>

                {/* Discount Badge */}
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  {product.discount}% OFF
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopDiscountProduct;
