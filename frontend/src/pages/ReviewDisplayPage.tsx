import  { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useReviewContext } from '../contexts/ReviewContext';
import { useFetchReviews } from '../hooks/useFetchReviews';
import PublicReviewCard from '../components/PublicReviewCard';
import PropertyDetails from '../components/PropertyDetails'; 
import type { NormalizedReview } from '../types/review.types';
import LoadingIndicator from '../components/LoadingIndicator';
import PublicHeader from '../components/header/PublicHeader';

const ReviewDisplayPage = () => {
  const { listingName } = useParams<{ listingName: string }>();
  const { approvedReviews } = useReviewContext();
  const { data, loading, error } = useFetchReviews();

  const currentListingData = useMemo(() => {
    if (!data || !listingName) return null;
    return data.find(item => item.listing.name.replace(/\s+/g, '-') === listingName);
  }, [data, listingName]);

  const displayedApprovedReviews = useMemo(() => {
    if (!currentListingData) return [];
    return currentListingData.reviews.filter((review: NormalizedReview) =>
      approvedReviews.includes(review.id)
    );
  }, [currentListingData, approvedReviews]);
  
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error: {error.message}</div>;
  }
  
  if (!currentListingData) {
    return <div className="text-center text-gray-600 mt-20">Listing not found.</div>;
  }

  const { listing } = currentListingData;

  return (
    <div className="bg-gray-100 min-h-screen">
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {listing.name}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {listing.city}
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
              <img src={listing.imageUrl} alt={listing.name} className="w-full h-auto object-cover" />
            </div>
            <PropertyDetails listing={listing} />
          </div>
          
          {/* Right Column: Reviews */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What our guests say
            </h2>
            <div className="flex flex-col gap-6">
              {displayedApprovedReviews.length > 0 ? (
                displayedApprovedReviews.map((review: NormalizedReview) => (
                  <PublicReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-center text-gray-500 p-6 bg-white rounded-xl shadow-sm">
                  There are no approved reviews for this property yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewDisplayPage;