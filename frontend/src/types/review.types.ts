export interface ReviewFilters {
    rating: number ;
    category: string;
    channel: string;
  }


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

  export interface Listing {
    name: string;
    city: string;
    pricePerNight: number;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    imageUrl: string;
  }
  
  export interface ListingWithReviews {
    listing: Listing;
    reviews: NormalizedReview[];
  }
  
  export type ReviewsApiPayload = ListingWithReviews[];
  
  