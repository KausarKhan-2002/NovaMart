import { useState } from "react";
import ProductHeader from "../Components/AdminProducts/ProductHeader";
import ProductUpload from "../Components/AdminProducts/ProductUpload";
import ProductView from "../Components/AdminProducts/ProductView";

function AllProducts() {
  const [showForm, setShowForm] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  const [upload, setUpload] = useState(false)

  return (
    <section className="h-[87vh] overflow-y-auto scrollbar-custom">
    {/* Product header */}
      <ProductHeader setUpload={setUpload} setShowForm={setShowForm} />

      {/* Product management form */}
      {showForm && (
        <ProductUpload
          showForm={showForm}
          setShowForm={setShowForm}
          productEditId={productEditId}
          upload={upload}

        />
      )}

      {/* All Products view */}
      <ProductView
        setShowForm={setShowForm}
        setProductEditId={setProductEditId}
        setUpload={setUpload}
      />
    </section>
  );
}

export default AllProducts;
