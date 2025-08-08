import { Link } from 'react-router-dom';
import type { Listing, NormalizedReview } from '../types/review.types';
import { FaBed, FaBath, FaUserFriends } from 'react-icons/fa';
import { useMemo } from 'react';

interface ListingCardProps {
  listing: Listing;
  reviews: NormalizedReview[];
  isAdmin : boolean;
}

const ListingCard = ({ listing, reviews, isAdmin }: ListingCardProps) => {
  const averageRating = useMemo(() => {
    const reviewsWithRating = reviews.filter(r => r.rating !== null);
    if (reviewsWithRating.length === 0) return '0';
    const totalRating = reviewsWithRating.reduce((sum, review) => sum + review.rating!, 0);
    return (totalRating / reviewsWithRating.length).toFixed(1);
  }, [reviews]);
  
  const urlSafeListingName = listing.name.replace(/\s+/g, '-');
  const targetPath = isAdmin ? `/dashboard/${urlSafeListingName}` : `/reviews/${urlSafeListingName}`;


  return (
    <Link to={targetPath}  className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.01]">
        <div className="relative">
          <img src={listing.imageUrl} alt={listing.name} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4 bg-white text-gray-800 font-bold px-3 py-1 rounded-full text-sm shadow">
            {averageRating} / 5
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{listing.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{listing.city}</p>
          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <FaBed className="text-gray-400 mr-2" />
              <span>{listing.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <FaBath className="text-gray-400 mr-2" />
              <span>{listing.bathrooms} Bathroom</span>
            </div>
            <div className="flex items-center">
              <FaUserFriends className="text-gray-400 mr-2" />
              <span>Up to {listing.guests} guests</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;