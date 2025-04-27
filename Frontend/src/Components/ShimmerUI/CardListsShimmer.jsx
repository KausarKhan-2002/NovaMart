function CardListShimmer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center p-4 gap-4 bg-white w-full max-w-2xl mx-auto rounded-lg animate-pulse"
        >
          {/* Skeleton Image */}
          <div className="w-1/2 lg:w-1/3 flex">
            <div className="w-full h-40 bg-gray-200 rounded-md"></div>
          </div>

          {/* Skeleton Content */}
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div> {/* Title */}
            <div className="flex gap-2">
              <div className="h-3 w-20 bg-gray-200 rounded"></div>{" "}
              {/* Rating */}
              <div className="h-3 w-10 bg-gray-200 rounded"></div>{" "}
              {/* Number */}
            </div>
            <div className="flex gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div> {/* Price */}
              <div className="h-4 w-12 bg-gray-200 rounded"></div> {/* MRP */}
            </div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>{" "}
            {/* Free delivery */}
            <div className="h-3 w-40 bg-gray-200 rounded"></div>{" "}
            {/* Warranty */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardListShimmer;