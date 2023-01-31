import express from 'express';
import * as emailController from '../controllers/emailController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

router
  .route('/:website/emails')
  .post(
    authController.restrictTo('admin', 'editor', 'user'),
    emailController.createEmail
  )
  .get(emailController.getAllEmails);
router
  .route('/:website/emails/:id')
  .patch(
    authController.restrictTo('admin', 'editor', 'user'),
    emailController.updateEmail
  )
  .post(emailController.getOneEmail);

export default router;
