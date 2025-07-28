import express from 'express';
import { getRewards, updateRewards } from '../controllers/rewardsController.js';

const router = express.Router();

// Route to get user rewards
router.get('/:id', getRewards);

// Route to update user rewards
router.put('/:id', updateRewards);

export default router;
