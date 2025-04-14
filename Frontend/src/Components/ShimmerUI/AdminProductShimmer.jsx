import React from "react";

const shimmerArray = new Array(8).fill(null);

function AdminProductShimmer() {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {shimmerArray.map((_, i) => (
        <div
          key={i}
          className="relative animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow"
        >
          {/* Image shimmer */}
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />

          {/* Simulated Edit Button shimmer */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />

          {/* Text shimmer */}
          <div className="p-4 space-y-3">
            <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-5/6 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="flex justify-between mt-2">
              <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="w-1/4 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProductShimmer;