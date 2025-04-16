import ProductCategories from '../Components/Landing/ProductCategories'
import Banner from '../Components/Landing/Banner'

function Home() {
  return (
    <div className="bg-slate-100/40 overflow-hidden">
      <ProductCategories />
      <Banner />
    </div>
  )
}

export default Home
