import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import BannerShimmer from "../ShimmerUI/BannerShimmer";
import { useRef } from "react";
import { URGENCY_MSG } from "../../Utils/constants";
import { sliderSettings } from "../../Helpers/sliderSettings";

function Banner({ banners }) {
  const sliderRef = useRef(null);

  if (!banners.length) return <BannerShimmer />;

  const settings = sliderSettings()

  return (
    <div className="w-full mx-auto">
      <Slider {...settings} ref={sliderRef}>
        {banners.map((bannerObj, index) => {
          const randomMessage =
            URGENCY_MSG[Math.floor(Math.random() * URGENCY_MSG.length)];

          return (
            <div key={index} className="relative outline-none">
              <div
                style={{ backgroundImage: `url(${bannerObj.images[0].url})` }}
                className="relative w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] bg-cover bg-center overflow-hidden"
              >
                {/* Flash Sale Badge */}
                <div className="absolute right-0 top-4 sm:top-6 md:top-8 lg:top-10 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-l-full shadow-lg z-20 flex items-center animate-pulse">
                  <span className="sm:mr-2">⚡</span>
                  <span className="hidden md:inline">FLASH SALE</span>
                  <span className="ml-1 sm:ml-2">
                    {bannerObj.discount}% OFF
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 sm:from-black/80 sm:via-black/50 sm:to-transparent w-full h-full z-10"></div>

                {/* Text content */}
                <div className="absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[500px] top-28 sm:top-1/2 transform -translate-y-1/2 left-3 sm:left-6 md:left-10 lg:left-12 text-white space-y-2 sm:space-y-3 md:space-y-4 p-2 sm:p-3 md:p-4 z-10 mt-4 sm:mt-0">
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg leading-tight">
                    {bannerObj.name?.toUpperCase()}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-slate-200 font-medium bg-black/5 backdrop-blur-[2px] rounded-lg p-1 sm:p-2 inline-block max-w-full">
                    {bannerObj.description?.slice(0, 80)}...
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-gradient-to-r from-red-900/50 to-transparent p-2 sm:p-3 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-baseline gap-2">
                      <p className="font-bold text-xl sm:text-2xl text-white">
                        ₹{bannerObj.selling}
                      </p>
                      <p className="line-through text-xs sm:text-sm text-white/60">
                        ₹{bannerObj.price}
                      </p>
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-white/30"></div>
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold">{randomMessage}</p>
                      {bannerObj.stock < 11 && (
                        <p>Only {bannerObj.stock} left in stock</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {bannerObj.tags?.slice(0, 3).map((tag, ind) => (
                      <span
                        key={ind}
                        className="text-[10px] xs:text-xs bg-white/20 text-white py-0.5 px-2 sm:py-1 sm:px-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/product/${bannerObj.productId}`}
                    className="mt-2 sm:mt-4 inline-block bg-gradient-to-r from-red-600 to-red-500 text-white text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg hover:shadow-red-500/30 transform hover:scale-105 font-bold"
                  >
                    Shop Now →
                  </Link>
                </div>

                {/* Decorative Blurs */}
                <div className="absolute right-0 bottom-0 w-16 h-16 sm:w-24 sm:h-24 bg-red-500/10 rounded-full blur-3xl"></div>
                <div className="absolute right-4 sm:right-10 top-4 sm:top-10 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-500/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Banner;