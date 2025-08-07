import { Router } from 'express';
import { getHostawayReviews } from '../controllers/reviews.controller';

const router = Router();

router.get('/hostaway', getHostawayReviews);

export default router;