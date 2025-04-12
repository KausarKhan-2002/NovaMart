import React from "react";
import InputField from "./InputField";

function ShippingDetails({ productInfo, handleChange }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Shipping Details
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Weight"
          name="shippingDetails.weight"
          placeholder="0kg"
          value={productInfo.shippingDetails.weight}
          onChange={handleChange}
        />
        <InputField
          label="Dimensions"
          name="shippingDetails.dimensions"
          placeholder="0*0*0 cm"
          value={productInfo.shippingDetails.dimensions}
          onChange={handleChange}
        />
        <InputField
          label="Shipping From"
          name="shippingDetails.shippingFrom"
          placeholder="city or warehouse"
          value={productInfo.shippingDetails.shippingFrom}
          onChange={handleChange}
        />
        <InputField
          label="Shipping Cost"
          name="shippingDetails.shippingCost"
          placeholder="0"
          value={productInfo.shippingDetails.shippingCost}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default ShippingDetails;
