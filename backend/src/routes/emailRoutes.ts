import express from 'express';
import * as emailController from '../controllers/emailController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

router.route('/:website/contact').post(emailController.contactFormEmail);
router
  .route('/:website/emails')
  .post(emailController.createEmail)
  .get(emailController.getAllEmails);
router
  .route('/:website/emails/:id')
  .patch(emailController.updateEmail)
  .post(emailController.getOneEmail);

export default router;
