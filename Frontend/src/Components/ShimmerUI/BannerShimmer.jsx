import React from "react";

function BannerShimmer() {
  return (
    <div className="w-full mx-auto">
      <div className="relative w-full h-[350px] lg:h-[420px] bg-gray-200 animate-pulse rounded-lg overflow-hidden shadow-lg">
        {/* Discount badge placeholder */}
        <div className="absolute left-4 top-4 w-24 h-8 bg-slate-300 rounded-full shadow-md"></div>

        {/* Text content skeleton */}
        <div className="absolute bottom-6 left-6 w-[65%] sm:w-[55%] md:w-[50%] lg:w-[40%] xl:w-[500px] space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>

          {/* Tags placeholder */}
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-16 bg-gray-300 rounded-lg"></div>
            <div className="h-6 w-12 bg-gray-300 rounded-lg"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-lg"></div>
          </div>

          {/* Button placeholder */}
          <div className="w-32 h-10 bg-slate-300 rounded-md mt-4"></div>
        </div>
      </div>
    </div>
  );
}

export default BannerShimmer;
