import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1741643688482",
  },
  {
    id: 2,
    name: "Men’s Running Shoes",
    price: 3199,
    quantity: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_rnSnZXN_mQH0P53wTHGGVWKSW8X5xwo_w&s",
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialProducts);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-[91vh] bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Your Shopping Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                />
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{item.price.toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto text-gray-800 dark:text-white font-semibold">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="flex justify-between font-bold text-gray-800 dark:text-white text-lg">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
