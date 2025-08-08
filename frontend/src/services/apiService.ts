import type { ReviewsApiPayload } from '../types/review.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchHostawayReviews = async (): Promise<ReviewsApiPayload> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reviews/hostaway`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ReviewsApiPayload = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error;
  }
};
