import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ReviewContextType {
  approvedReviews: number[];
  toggleApproved: (id: number) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

interface ReviewProviderProps {
  children: ReactNode;
}

// Key for localStorage
const LOCAL_STORAGE_KEY = 'flexLivingApprovedReviews';

export const ReviewProvider = ({ children }: ReviewProviderProps) => {
  // Initialize state from localStorage or an empty array if none exists
  const [approvedReviews, setApprovedReviews] = useState<number[]>(() => {
    try {
      const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : [];
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      return [];
    }
  });

  // useEffect to save the state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(approvedReviews));
    } catch (error) {
      console.error("Failed to write to localStorage", error);
    }
  }, [approvedReviews]); // This effect runs whenever approvedReviews changes

  const toggleApproved = (id: number) => {
    setApprovedReviews(prev =>
      prev.includes(id) ? prev.filter(reviewId => reviewId !== id) : [...prev, id]
    );
  };

  return (
    <ReviewContext.Provider value={{ approvedReviews, toggleApproved }}>
      {children}
    </ReviewContext.Provider>
  );
};

// Custom hook to use the review context
export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
  }
  return context;
};