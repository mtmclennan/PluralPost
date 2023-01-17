import express from 'express';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post(
  '/signup',
  authController.checkIfAdminExists,
  authController.protect,
  authController.restrictTo('admin'),
  authController.signUp
);
router.post('/login', authController.login);
router.get('/getUser', authController.isLoggedIn, userController.getUser);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.route('/updateMyPassword').patch(authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  // .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
