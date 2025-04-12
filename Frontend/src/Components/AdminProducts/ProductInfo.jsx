import InputField from './InputField'

function ProductInfo({productInfo, handleChange}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
    <InputField
      label="Product Name"
      name="name"
      value={productInfo.name}
      onChange={handleChange}
    />
    <InputField
      label="Brand"
      name="brand"
      value={productInfo.brand}
      onChange={handleChange}
    />
  </div>
  )
}

export default ProductInfo