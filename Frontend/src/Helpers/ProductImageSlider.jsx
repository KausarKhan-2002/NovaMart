import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImageSlider = ({ images = [], autoPlay = false }) => {
  if (!images.length) return <p>No images found</p>;

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
                src={img.url}
                alt={`product-${idx}`}
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export default ProductImageSlider;