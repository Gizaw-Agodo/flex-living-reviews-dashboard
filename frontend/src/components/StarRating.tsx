import { FaStar } from 'react-icons/fa'; 


const StarRating = ({ rating }: { rating: number | null }) => {
  if (rating === null) return <p className="text-sm text-gray-500">No overall rating</p>;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        <FaStar />
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

export default StarRating;