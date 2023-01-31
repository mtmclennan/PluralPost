import express from 'express';
import * as websiteController from '../controllers/websiteController';
import * as authController from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(authController.protect, websiteController.getAllWebsites)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'editor'),
    websiteController.createWebsite
  );

router
  .route('/:id')
  .get(authController.protect, websiteController.getWebsite)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'editor'),
    websiteController.editWebsite
  );

export default router;
