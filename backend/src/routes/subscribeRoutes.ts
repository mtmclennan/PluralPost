import express from 'express';
import * as subscribeController from '../controllers/subscribeController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);
router
  .route('/:website/subscribers')
  .get(subscribeController.getAllSubscribers)
  .post(subscribeController.createSubscriber);

router
  .route('/:website/delete/:id')
  .delete(subscribeController.deleteSubscriber);

router.route('/email').post(subscribeController.sendSubscriberEmail);

// router
//   .route('/ByWebsite/:website')
//   .get(subscribeController.getSubscribersByWebsite)
//   .post(subscribeController.emailSubscribersByWebsite);

export default router;
