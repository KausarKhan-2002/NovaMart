import InputField from "./InputField";

function PricingStock({ productInfo, handleChange }) {

  const discountAmount = (productInfo.price * productInfo.discount) / 100
  const sellingPrice = productInfo.price - discountAmount

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <InputField
        label="Price"
        name="price"
        value={Number(productInfo.price)}
        onChange={handleChange}
      />

      <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Selling price</label>
      <input
        type="text"
        value={sellingPrice}
        placeholder="Auto generate"
        className="w-full p-3 outline-none border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        readOnly
      />
      </div>
      {/* <InputField
            label="Selling Price"
            name="selling"
            value={productInfo.selling}
            onChange={handleChange}
          /> */}
      <InputField
        label="Discount (%)"
        name="discount"
        value={Number(productInfo.discount)}
        onChange={handleChange}
      />
      <InputField
        label="Stock"
        name="stock"
        value={productInfo.stock}
        onChange={handleChange}
      />
    </div>
  );
}

export default PricingStock;
