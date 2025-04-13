import { useState } from "react";
import ProductHeader from "../Components/AdminProducts/ProductHeader";
import ProductUpload from "../Components/AdminProducts/ProductUpload";
import ProductView from "../Components/AdminProducts/ProductView";

function AllProducts() {
  const [showForm, setShowForm] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  // console.log(productManager);
  

  return (
    <section className="h-[87vh] overflow-y-auto scrollbar-custom">
    {/* Product header */}
      <ProductHeader setShowForm={setShowForm} />

      {/* Product management form */}
      {showForm && (
        <ProductUpload
          showForm={showForm}
          setShowForm={setShowForm}
          productEditId={productEditId}
        />
      )}

      {/* All Products view */}
      <ProductView
        setShowForm={setShowForm}
        setProductEditId={setProductEditId}
      />
    </section>
  );
}

export default AllProducts;
