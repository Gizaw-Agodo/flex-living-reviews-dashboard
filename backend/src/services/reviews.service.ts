import { NormalizedReview, Listing, ReviewsApiPayload } from '../types/hostaway.types';

import reviewsData from '../data/mock-reviews.json';
import listingData from "../data/mock-listing.json"

const getRawHostawayReviews = ()=> {
  return reviewsData.result;
};

const getRawListings = (): Listing[] => {
  return listingData
};

export const getAndNormalizeHostawayReviews = (): ReviewsApiPayload => {
  const rawReviews = getRawHostawayReviews();
  const rawListings = getRawListings();
  
  const reviewsByListingMap = new Map<string, NormalizedReview[]>();

  rawReviews.forEach(rawReview => {
    const categoryRatings = rawReview.reviewCategory.reduce((acc, current) => {
      acc[current.category] = current.rating;
      return acc;
    }, {} as { [key: string]: number });

    const normalizedReview: NormalizedReview = {
      id: rawReview.id,
      listingName: rawReview.listingName,
      guestName: rawReview.guestName,
      rating: rawReview.rating,
      reviewText: rawReview.publicReview,
      reviewType: rawReview.type,
      channel: 'Hostaway',
      date: rawReview.submittedAt,
      categoryRatings: categoryRatings,
      isApprovedForDisplay: false,
    };
    
    if (!reviewsByListingMap.has(normalizedReview.listingName)) {
      reviewsByListingMap.set(normalizedReview.listingName, []);
    }
    reviewsByListingMap.get(normalizedReview.listingName)?.push(normalizedReview);
  });
  
  // Now, join the listings with their corresponding reviews
  const combinedPayload: ReviewsApiPayload = rawListings.map(listing => {
    const reviewsForListing = reviewsByListingMap.get(listing.name) || [];
    return {
      listing: listing,
      reviews: reviewsForListing,
    };
  });
  
  return combinedPayload;
};