import type { NormalizedReview } from '../types/review.types';
import { FaStar } from 'react-icons/fa'; 

interface ReviewCardProps {
  review: NormalizedReview;
  isApproved: boolean;
  onToggleApproved: (id: number) => void;
  readOnly?: boolean; 
}



const ReviewCard = ({ review, isApproved, onToggleApproved, readOnly }: ReviewCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col h-full transition-all hover:shadow-xl">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">— {review.guestName}</h3>
            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
          </div>
          {review.rating !== null && <StarRating rating={review.rating} />}
        </div>
        <p className="text-gray-700 italic text-base">"{review.reviewText}"</p>
        {/* <p className="text-sm text-gray-600 mt-4">— {review.guestName}</p> */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(review.categoryRatings).map(([category, rating]) => (
            <span key={category} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
              {category.replace(/_/g, ' ')}: {rating}/10
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
      {!readOnly && (
        <button
          onClick={() => onToggleApproved(review.id)}
          className={`mt-4 w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 ${
            isApproved
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isApproved ? 'Approved for Website' : 'Approve for Website'}
        </button>
      )}
      </div>
    </div>
  );
};

export default ReviewCard;


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