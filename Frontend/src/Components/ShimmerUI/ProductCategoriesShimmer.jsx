function ProductCategoriesShimmer() {
  return (
    <div className="py-5 px-4 md:px-5 lg:px-16 animate-pulse">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-3 justify-items-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center group"
          >
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md border border-gray-300 dark:border-gray-600" />
            <div className="mt-2 w-16 h-4 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCategoriesShimmer;
