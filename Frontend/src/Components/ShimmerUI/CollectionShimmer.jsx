import React from "react";

function CollectionShimmer() {
  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-2xl font-medium mb-6 capitalize text-slate-800">
        Loading products...
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionShimmer;
