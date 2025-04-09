import React from "react";

function CartShimmer() {
  const shimmerItems = Array(2).fill(0); // Simulate 2 cart items

  return (
    <div className="min-h-[91vh] bg-gray-100 dark:bg-gray-900 py-10 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-8 mx-auto"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Item Shimmers */}
          <div className="lg:col-span-2 space-y-6">
            {shimmerItems.map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
              >
                <div className="w-full sm:w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 sm:mb-0 sm:mr-4"></div>
                <div className="flex-1 w-full space-y-2">
                  <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>

          {/* Summary Shimmer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
            <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl w-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartShimmer;