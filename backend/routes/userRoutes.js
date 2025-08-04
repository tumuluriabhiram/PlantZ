import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, updateUserData } from '../controllers/userController.js';
import { updateRewards } from '../controllers/rewardsController.js';

const userRouter = express.Router();

userRouter
  .get('/data', userAuth, getUserData)
  .put('/update', userAuth, updateUserData);


export default userRouter;