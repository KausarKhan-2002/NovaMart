import { preloadComponent } from "../../Helpers/preLoad";
import ProductCategoriesShimmer from "../ShimmerUI/ProductCategoriesShimmer";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

function ProductCategories({ categories }) {
  if (categories.length === 0) return <ProductCategoriesShimmer />;

  const swiperRef = useRef();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [needsNavigation, setNeedsNavigation] = useState(false);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);

  const updateNavigationState = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
      setNeedsNavigation(!swiperRef.current.isEnd || !swiperRef.current.isBeginning);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 768); // md breakpoint
      if (swiperRef.current) {
        swiperRef.current.update();
        updateNavigationState();
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="py-5 px-2 md:px-6 lg:px-10 relative">
      <div className="relative">
        {/* Previous button - hidden on small screens or when not needed */}
        {isMediumOrLarger && needsNavigation && (
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`absolute -left-6 top-8 z-10 p-2 rounded-full shadow-lg border transition-all transform -translate-y-1/2 ${
              isBeginning 
                ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
            }`}
          >
            <FiChevronLeft className={
              isBeginning 
                ? 'text-gray-400 dark:text-gray-500 text-xs'
                : 'text-gray-700 dark:text-gray-200 text-xs'
            } />
          </button>
        )}
        
        <Swiper
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={9}
          slidesPerGroup={2}
          speed={500}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavigationState();
          }}
          onSlideChange={updateNavigationState}
          onResize={updateNavigationState}
          breakpoints={{
            1024: {
              slidesPerView: 9,
              slidesPerGroup: 3,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 7,
              slidesPerGroup: 2,
              spaceBetween: 16
            },
            640: {
              slidesPerView: 8,
              slidesPerGroup: 1,
              spaceBetween: 16
            },
            320: {
              slidesPerView: 6,
              slidesPerGroup: 1,
              spaceBetween: 16
            }
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.product?._id} className="px-2">
              <Link
                onMouseEnter={preloadComponent}
                to={`/collection/${category.product?.category}`}
                className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-center w-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <img
                      src={category?.product.images[0]?.url}
                      alt={category.product?.category}
                      className="w-full h-full object-contain mx-auto"
                    />
                  </div>
                </div>
                <p className="mt-2 text-center text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                  {category.product?.category}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next button - hidden on small screens or when not needed */}
        {isMediumOrLarger && needsNavigation && (
          <button 
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`absolute -right-6 top-8 z-10 p-2 rounded-full shadow-lg border transition-all transform -translate-y-1/2 ${
              isEnd 
                ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <FiChevronRight className={
              isEnd 
                ? 'text-gray-400 dark:text-gray-500 text-sm'
                : 'text-gray-700 dark:text-gray-200 text-sm'
            } />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCategories;