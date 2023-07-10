import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  totalStars?: number;
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  return (
    <div className="flex flex-row items-center">
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return <FaStar key={index} className="text-yellow-500" />;
        } else if (index === filledStars && hasHalfStar) {
          return <FaStarHalfAlt key={index} className="text-yellow-500" />;
        } else {
          return <FaRegStar key={index} className="text-gray-400" />;
        }
      })}
    </div>
  );
};

export default StarRating;
