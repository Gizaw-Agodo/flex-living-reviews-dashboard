export interface Listing {
  name: string;
  city: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  imageUrl: string;
}

// Review category data 
export interface HostawayReviewCategory {
    category: string;
    rating: number;
  }
  
  // a single raw review 
  export interface HostawayReview {
    id: number;
    type: 'guest-to-host' | 'host-to-guest';
    status: string;
    rating: number | null;
    publicReview: string;
    reviewCategory: HostawayReviewCategory[];
    submittedAt: string;
    guestName: string;
    listingName: string;
  }
  
  // Normalized review data 
  export interface NormalizedReview {
    id: number;
    listingName: string;
    guestName: string;
    rating: number | null;
    reviewText: string;
    reviewType: 'guest-to-host' | 'host-to-guest';
    channel: string; 
    date: string;
    categoryRatings: { [key: string]: number };
    isApprovedForDisplay: boolean;
  }

  export interface ListingWithReviews {
    listing: Listing;
    reviews: NormalizedReview[];
  }
  export type ReviewsApiPayload = ListingWithReviews[];
