import express from 'express';
import * as emailController from '../controllers/emailController';

const router = express.Router();

router.route('/:website/contact').post(emailController.contactFormEmail);

export default router;
