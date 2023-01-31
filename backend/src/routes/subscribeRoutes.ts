import express from 'express';
import * as subscribeController from '../controllers/subscribeController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);
router
  .route('/:website/subscribers')
  .get(subscribeController.getAllSubscribers)
  .post(
    authController.restrictTo('admin'),
    subscribeController.createSubscriber
  );

router
  .route('/:website/delete/:id')
  .delete(
    authController.restrictTo('admin', 'editor'),
    subscribeController.deleteSubscriber
  );

router.route('/:website/email').post(subscribeController.sendSubscriberEmail);

export default router;
