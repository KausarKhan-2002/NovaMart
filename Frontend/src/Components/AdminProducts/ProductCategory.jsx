import productCategory from "../../Helpers/categories";

function ProductCategory({setProductInfo}) {

  return (
    <select
      onChange={(e) =>
        setProductInfo((prev) => ({
          ...prev,
          category: e.target.value,
        }))
      }
      // defaultValue={}
      className="w-full focus:outline-none border border-gray-300 rounded-xl py-3 px-2"
    >
      {productCategory.map((category) => (
        <option
          className="border-none"
          key={category.id}
          value={category.value}
        >
          {category.label}
        </option>
      ))}
    </select>
  );
}

export default ProductCategory;
