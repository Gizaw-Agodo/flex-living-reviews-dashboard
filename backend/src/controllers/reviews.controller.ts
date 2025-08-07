import { Request, Response } from 'express';
import { getAndNormalizeHostawayReviews } from '../services/reviews.service';

export const getHostawayReviews = (req: Request, res: Response) => {
  try {
    const normalizedReviews = getAndNormalizeHostawayReviews();
    res.status(200).json(normalizedReviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};