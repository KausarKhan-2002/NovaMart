import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImageSlider = ({ images = [], autoPlay = false }) => {
  if (!images || !images.length) {
    return <p className="text-center text-gray-500">No images found</p>;
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: autoPlay,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img?.url || "/fallback.jpg"} // Fallback image if img.url is undefined
              alt={`product-${idx}`}
              className="w-full h-40 object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageSlider;