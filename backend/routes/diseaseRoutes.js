import express from 'express';
import diseaseController from '../controllers/diseaseController.js';
import upload from '../config/multer.js';

const diseaseRouter = express.Router();


diseaseRouter
  .get('/', diseaseController.getDiseases)
  .post('/', upload.single('image'), diseaseController.postImage);


export default diseaseRouter;