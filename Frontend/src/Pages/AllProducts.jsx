import { useState } from "react";
import ProductHeader from "../Components/AdminProducts/ProductHeader";
import ProductUpload from "../Components/AdminProducts/ProductUpload";

function AllProducts() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section>
      <ProductHeader setShowForm={setShowForm} />
      {showForm && <ProductUpload showForm={showForm} setShowForm={setShowForm} />}
    </section>
  );
}

export default AllProducts;
