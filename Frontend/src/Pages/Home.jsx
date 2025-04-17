import ProductCategories from "../Components/Landing/ProductCategories";
import Banner from "../Components/Landing/Banner";
import { useEffect, useState } from "react";
import { useLandingPage } from "../Hooks/useLandingPage";
import TopDiscountProduct from "../Components/Landing/TopDiscountProduct";

function Home() {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([])
  
  const landingPage = useLandingPage();
  useEffect(() => {
    landingPage(setCategories, setBanners, setDiscountProducts);
  }, []);

  return (
    <div className="bg-slate-100/40 overflow-hidden">
      <ProductCategories categories={categories} />
      <Banner banners={banners} />
      <TopDiscountProduct discountProducts={discountProducts} />
    </div>
  );
}

export default Home;
