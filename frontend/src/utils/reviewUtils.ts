import type { NormalizedReview, ReviewFilters } from '../types/review.types';

export const getFilteredAndSortedReviews = (
  reviews: NormalizedReview[],
  filters: ReviewFilters,
  sortBy: string
): NormalizedReview[] => {
  let filteredReviews = [...reviews];

  // Filter by Rating
  if (filters.rating) {
    filteredReviews = filteredReviews.filter(review => review.rating && review.rating >= filters.rating);
  }

  // Filter by Channel
  if (filters.channel && filters.channel !== 'all') {
    filteredReviews = filteredReviews.filter(review => review.channel === filters.channel);
  }
  
  // Filter by Category
  if (filters.category && filters.category !== 'all') {
    filteredReviews = filteredReviews.filter(review => 
      review.categoryRatings && review.categoryRatings[filters.category]
    );
  }

  if (sortBy) {
    filteredReviews.sort((a, b) => {
      switch (sortBy) {
        case 'rating_desc':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'rating_asc':
          return (a.rating ?? 0) - (b.rating ?? 0);
        case 'date_desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default:
          return 0;
      }
    });
  }

  return filteredReviews;
};