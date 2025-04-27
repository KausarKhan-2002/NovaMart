import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

function Rating({ rating, ratingCount }) {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-slate-600" />);
    }
    if (halfStar) {
      stars.push(<FaRegStarHalfStroke key="half" className="text-slate-500" />);
    }
    return stars;
  };

  return (
    <div className="flex text-xs md:text-sm items-center gap-2 text-slate-700">
      <span className="flex">{renderStars()}</span>
      <span className="text-gray-600">({ratingCount})</span>
    </div>
  );
}

export default Rating;