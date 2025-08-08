import type { NormalizedReview } from '../types/review.types';
import StarRating from './StarRating';

interface PublicReviewCardProps {
  review: NormalizedReview;
}

const PublicReviewCard = ({ review }: PublicReviewCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <StarRating rating={review.rating} />
          <span className="text-sm font-semibold text-gray-700">{review.rating} / 5</span>
        </div>
        <span className="text-sm text-gray-500">
          Reviewed on {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-800 text-lg italic mb-4">"{review.reviewText}"</p>
      <p className="text-gray-600 font-medium">— {review.guestName}</p>
    </div>
  );
};

export default PublicReviewCard;