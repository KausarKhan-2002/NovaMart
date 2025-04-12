
function ProductDescription({productInfo, handleChange, limit, descriptionLimit}) {
  return (
    <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">
            Product Description
          </label>
          <textarea
            name="description"
            value={productInfo.description}
            onChange={handleChange}
            className="w-full p-3 resize-none outline-none border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <p className="absolute right-2 bottom-3 text-gray-500 text-sm">
            {descriptionLimit}/{limit}
          </p>
        </div>
  )
}

export default ProductDescription
