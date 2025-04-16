import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { useBannerImages } from "../../Hooks/useBannerImages";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Banner() {
  const [banners, setBanners] = useState([]);
  const sliderRef = useRef(null);
  const bannerImages = useBannerImages();

  useEffect(() => {
    bannerImages(setBanners);
  }, []);

  const handleBeforeChange = () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  if (banners.length === 0)
    return <h1 className="text-center mt-10">Loading banners...</h1>;

  const settings = {
    dots: true,
    arrows: true, // Show left and right arrows
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: handleBeforeChange,
  };

  return (
    <div className="w-full mx-auto">
      <Slider {...settings} ref={sliderRef}>
        {banners.map((bannerObj, index) => (
          <div key={index} className="relative outline-none">
            <div
              style={{ backgroundImage: `url(${bannerObj.images[0].url})` }}
              className="relative w- h-[350px] lg:h-[420px] bg-cover bg-center shadow-lg"
            >
              {/* Discount badge at top-left */}
              <div className="absolute left-[-25%] top-2 sm:left-[-13%] md:left-[-9.5%]  bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-20">
                {bannerObj.discount}% OFF
              </div>

              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent w-full h-full z-10"></div>

              {/* Text content on top of the image */}
              <div className="absolute w-[65%] sm:w-[55%] md:w-[50%] lg:w-[40%] xl:w-[500px] top-1 lg:top-7 bottom-6 left-6 text-slate-300 space-y-4 p-4 z-10">
                <h2 className="text-4xl font-bold font-mono">
                  {bannerObj.name.capitalize()}
                </h2>
                <p className="text-sm text-slate-300 font-medium">
                  {bannerObj.description.limitCharacters(100)}...
                </p>
                <p className="font-semibold flex items-center gap-5">
                  <span>₹{bannerObj.selling}</span>
                  <span className="line-through text-sm text-white/60">
                    {bannerObj.price}
                  </span>
                </p>
                {bannerObj.stock < 11 && (
                  <p className="text-xs">
                    Only {bannerObj.stock} stock are available
                  </p>
                )}

                {/* Display tags if available */}
                <div className="flex flex-wrap space-x-2">
                  {bannerObj.tags?.length > 0 &&
                    bannerObj.tags.map((tag, ind) => (
                      <span
                        key={ind}
                        className="text-xs bg-gray-800 text-white py-1 px-3 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {/* Optional: CTA button */}
                <Link
                  to={"/checkout"}
                  href={`/product/${bannerObj.productId}`}
                  className="mt-4 inline-block bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;