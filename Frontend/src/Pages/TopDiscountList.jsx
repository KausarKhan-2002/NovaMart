import React, { useEffect, useState } from "react";
import { useAllTopDiscount } from "../Hooks/useAllTopDiscount";
import CardList from "./CardList";

const TopDiscountList = () => {
  const [discountProducts, setDiscountProducts] = useState([])
  const allTopDiscount = useAllTopDiscount();

  useEffect(() => {
    allTopDiscount(setDiscountProducts);
  }, []);

  return (
    <div>
      <CardList products={discountProducts} />
    </div>
  );
};

export default TopDiscountList;