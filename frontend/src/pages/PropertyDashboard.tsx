import { useState, useMemo, useEffect } from 'react';
import { useFetchReviews } from '../hooks/useFetchReviews';
import type { NormalizedReview, ReviewFilters } from '../types/review.types';
import ReviewCard from '../components/ReviewCard';
import Filters from '../components/Filters';
import LoadingIndicator from '../components/LoadingIndicator';
import { getFilteredAndSortedReviews } from '../utils/reviewUtils';
import { useReviewContext } from '../contexts/ReviewContext';
import { useParams } from 'react-router-dom';
import { FaStar, FaCommentDots, FaCheckCircle } from 'react-icons/fa';
import AdminHeader from '../components/header/AdminHeader';


const PropertyDashboard = () => {
  const { listingName } = useParams<{ listingName: string }>();
  const { data, loading, error } = useFetchReviews();
  const { approvedReviews, toggleApproved } = useReviewContext();

  const [filters, setFilters] = useState<ReviewFilters>({
    rating: 0,
    category: 'all',
    channel: 'all',
  });
  const [sortBy, setSortBy] = useState('date_desc');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const allPropertyReviews = useMemo(() => {
    if (!listingName || !data) return [];
    const foundListing = data.find(item => item.listing.name.replace(/\s+/g, '-') === listingName);
    return foundListing ? foundListing.reviews : [];
  }, [data, listingName]);

  const displayedReviews = useMemo(() => {
    return getFilteredAndSortedReviews(allPropertyReviews, filters, sortBy);
  }, [allPropertyReviews, filters, sortBy]);
  
  useEffect(() => {
    setIsProcessing(true);
    const handler = setTimeout(() => {
      setIsProcessing(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [filters, sortBy]);
  
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    allPropertyReviews.forEach(review => {
      Object.keys(review.categoryRatings).forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  }, [allPropertyReviews]);
  
  const averageRating = useMemo(() => {
    const reviewsWithRating = allPropertyReviews.filter(r => r.rating !== null);
    if (reviewsWithRating.length === 0) return '0';
    const totalRating = reviewsWithRating.reduce((sum, review) => sum + review.rating!, 0);
    return (totalRating / reviewsWithRating.length).toFixed(1);
  }, [allPropertyReviews]);

  const approvedReviewsCountForProperty = useMemo(() => {
    return allPropertyReviews.filter(review => approvedReviews.includes(review.id)).length;
  }, [allPropertyReviews, approvedReviews]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
     <AdminHeader/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Dashboard for {listingName?.replace(/-/g, ' ')}
        </h1>
        <p className="mt-2 text-lg text-gray-600 mb-8">Manage reviews for this property.</p>

        {/* Stats Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Average Rating Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                <FaStar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{averageRating}</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </div>
            
            {/* Total Reviews Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FaCommentDots className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{allPropertyReviews.length}</p>
                <p className="text-sm text-gray-500">Total Reviews</p>
              </div>
            </div>
            
            {/* Reviews Approved Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <FaCheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{approvedReviewsCountForProperty}</p>
                <p className="text-sm text-gray-500">Reviews Approved</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={allCategories}
        />

        {/* Reviews List */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews for this Property ({displayedReviews.length})</h2>
          {isProcessing ? (
            <LoadingIndicator />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedReviews.length > 0 ? (
                displayedReviews.map((review: NormalizedReview) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    isApproved={approvedReviews.includes(review.id)}
                    onToggleApproved={toggleApproved}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No reviews match the selected filters.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PropertyDashboard;