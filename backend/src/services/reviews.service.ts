import { readFileSync } from 'fs';
import path from 'path';
import { HostawayReview, NormalizedReview } from '../types/hostaway.types';


const getRawHostawayReviews = (): HostawayReview[] => {
  const reviewsPath = path.join(__dirname, '../data/mock-reviews.json');
  const reviewsJson = readFileSync(reviewsPath, 'utf-8');
  return JSON.parse(reviewsJson);
};

// core normalization logic
export const getAndNormalizeHostawayReviews = (): NormalizedReview[] => {
  const rawReviews = getRawHostawayReviews();

  return rawReviews.map(rawReview => {
   
    const categoryRatings = rawReview.reviewCategory.reduce((acc, current) => {
      acc[current.category] = current.rating;
      return acc;
    }, {} as { [key: string]: number });

    return {
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
    
  });
};