import { readFileSync } from 'fs';
import path from 'path';
import { HostawayReview, NormalizedReview, Listing, ReviewsApiPayload } from '../types/hostaway.types';


const getRawHostawayReviews = (): HostawayReview[] => {
  const reviewsPath = path.join(__dirname, '../data/mock-reviews.json');
  const reviewsJson = readFileSync(reviewsPath, 'utf-8');
  return JSON.parse(reviewsJson);
};


const getRawListings = (): Listing[] => {
  const listingsPath = path.join(__dirname, '../data/mock-listing.json');
  const listingsJson = readFileSync(listingsPath, 'utf-8');
  return JSON.parse(listingsJson);
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