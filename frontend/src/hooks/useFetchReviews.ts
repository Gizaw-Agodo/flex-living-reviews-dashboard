import { useState, useEffect } from 'react';
import { fetchHostawayReviews } from '../services/apiService';
import type { ReviewsApiPayload } from '../types/review.types';

export const useFetchReviews = () => {
  const [data, setData] = useState<ReviewsApiPayload>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchHostawayReviews();
        setData(fetchedData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  return { data, loading, error };
};