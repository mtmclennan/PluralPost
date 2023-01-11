import express from 'express';
import * as websiteController from '../controllers/websiteController';
import * as authController from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(authController.protect, websiteController.getAllWebsites)
  .post(authController.protect, websiteController.createWebsite);

router
  .route('/:id')
  .get(authController.protect, websiteController.getWebsite)
  .patch(authController.protect, websiteController.editWebsite);

export default router;
