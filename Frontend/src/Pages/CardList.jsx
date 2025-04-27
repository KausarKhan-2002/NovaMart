import { memo, useEffect, useState } from "react";
import CardListShimmer from "../Components/ShimmerUI/CardListsShimmer";
import Rating from "../Shared/Rating";
import { getRandomRatings, getRandomWarranty } from "../Utils/random";

let arr = [];
const FilterBtns = ({ setData, products }) => {
  const [active, setActive] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("default");
  const [selectedRating, setSelectedRating] = useState("default");

  const handleFilters = (isActive) => {
    // console.log(filters);

    // arr.includes(isActive)
    //   ? (arr = arr.filter((ele) => ele != isActive))
    //   : arr.push(isActive);
    // // setFilters(arr);
    // console.log(arr);

    if (isActive === "name") {
      const sortedProducts = products.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      //   console.log(sortedProducts);
      setData(sortedProducts);
    }

    setActive((prev) => (prev !== isActive ? isActive : null));
  };

  const handlePrice = (e) => {
    const value = e.target.value;
    setSelectedPrice(value);
    let sortedProducts;

    if (value === "descending") {
      sortedProducts = products.slice().sort((a, b) => b.price - a.price);
    } else if (value === "ascending") {
      sortedProducts = products.slice().sort((a, b) => a.price - b.price);
    } else if (value === "30000") {
      sortedProducts = products
        .slice()
        .filter((product) => product.price <= 30000);
    } else if (value === "20000") {
      sortedProducts = products
        .slice()
        .filter((product) => product.price <= 20000);
    } else if (value === "10000") {
      sortedProducts = products
        .slice()
        .filter((product) => product.price <= 10000);
    } else if (value === "5000") {
      sortedProducts = products
        .slice()
        .filter((product) => product.price <= 5000);
    } else if (value === "2000") {
      sortedProducts = products
        .slice()
        .filter((product) => product.price <= 2000);
    }
    setData(sortedProducts);
  };

  const handleRating = (e) => {
    const value = e.target.value;
    setSelectedRating(value);
    let sortedProducts;

    if (value === "descending") {
      sortedProducts = products.slice().sort((a, b) => b.rating - a.rating); // High to Low
    } else if (value === "ascending") {
      sortedProducts = products.slice().sort((a, b) => a.rating - b.rating); // Low to High
    } else if (value === "4") {
      sortedProducts = products.filter((p) => p.rating > 4); // Rating above 4
    } else if (value === "3") {
      sortedProducts = products.filter((p) => p.rating > 3); // Rating above 3
    } else if (value === "2") {
      sortedProducts = products.filter((p) => p.rating > 2); // Rating above 2
    }

    setData(sortedProducts);
  };

  return (
    <div className="my-3 flex gap-3">
      <button
        onClick={() => handleFilters("name")}
        className={`px-2 py-1 bg-white border border-slate-200 rounded-md ${
          active === "name" && "border-slate-400"
        } cursor-pointer`}
      >
        Sort by name
      </button>
      <button
        onClick={() => handleFilters("price")}
        className={`px-2 py-1 bg-white border border-slate-200 rounded-md ${
          active === "price" && "border-slate-400"
        } cursor-pointer`}
      >
        <div className="flex items-center">
        <p>Sort by price:</p>
          <select
            onChange={handlePrice}
            value={selectedPrice}
            className="p-2 bg-white border-none outline-none text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="descending">High to Low</option>
            <option value="ascending">Low to High</option>
            <option value="30000">Under 30000</option>
            <option value="20000">Under 20000</option>
            <option value="10000">Under 10000</option>
            <option value="20000">Under 5000</option>
            <option value="10000">Under 2000</option>
          </select>
        </div>
      </button>
      <button
        onClick={() => handleFilters("rating")}
        className={`px-2 py-1 bg-white border border-slate-200 rounded-md ${
          active === "rating" && "border-slate-400"
        } cursor-pointer`}
      >
        <div className="flex items-center">
          <p>Sort by ratings:</p>
          <select
            onChange={handleRating}
            value={selectedRating}
            className="p-2 bg-white border-none outline-none text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="descending">High to Low</option>
            <option value="ascending">Low to High</option>
            <option value="4">Rating about 4</option>
            <option value="3">Rating above 3</option>
            <option value="2">Rating above 2</option>
          </select>
        </div>
      </button>
      <button
        onClick={() => handleFilters("delivery")}
        className={`px-2 py-1 bg-white border border-slate-200 rounded-md ${
          active === "delivery" && "border-slate-400"
        } cursor-pointer`}
      >
        Free delivery
      </button>
    </div>
  );
};

function CardList({ products }) {
  const [data, setData] = useState([]);

  const cards = data.length ? data : products;
  console.log(cards);

  if (products.length === 0) return <CardListShimmer />;

  return (
    <section className="px-3 md:px-8 lg:px-12 xl:px-20">
      <FilterBtns setData={setData} products={products} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.length &&
          cards.map((p) => {
            const { rating, ratingCount } = getRandomRatings();

            return (
              <div
                key={p._id}
                className="flex items-center p-4 gap-4 cursor-pointer hover:shadow-md duration-300 bg-white w-full max-w-2xl mx-auto rounded-lg"
              >
                {/* Product Image */}
                <div className="w-1/2 lg:w-1/3 flex">
                  <img
                    className="w-full h-40 object-scale-down"
                    src={p.images[0].url}
                    alt={p.name}
                  />
                </div>

                {/* Product Content */}
                <div className="flex-1 space-y-2">
                  <h2 className="md:text-lg font-semibold text-gray-800 capitalize">
                    {p.name}
                  </h2>

                  {/* Reusable Rating */}
                  <Rating rating={rating} ratingCount={ratingCount} />

                  {/* Price */}
                  <p className="flex gap-2 text-sm font-bold">
                    <span className="text-slate-800">₹{p.selling}</span>
                    <span className="text-gray-400 line-through font-normal">
                      ₹{p.price}
                    </span>
                  </p>

                  {/* Delivery and Warranty */}
                  <p className="text-xs md:text-sm text-green-500 font-medium">
                    Free delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    {getRandomWarranty()} warranty by{" "}
                    <span className="font-semibold">{p.brand}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default memo(CardList);
