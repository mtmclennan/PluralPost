import express from 'express';
import * as authController from '../controllers/authController';
import * as contentController from '../controllers/contentController';

const router = express.Router();

router.route('/:website/articles').get(contentController.getAllPublishedPosts);

router.route('/:website/post/:slug').post(contentController.getPostBySlug);
router
  .route('/:website/images/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'editor', 'user'),
    contentController.uploadContentPhoto,
    contentController.resizeContentPhoto,
    contentController.sendImageResponse
  );

router
  .route('/:website/featured-image/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'editor', 'user'),
    contentController.uploadContentPhoto,
    contentController.resizeContentPhoto,
    contentController.sendFeatureResponse
  );

router.use(authController.protect);
router
  .route('/:website/posts')
  .post(
    authController.restrictTo('admin', 'editor', 'user'),
    contentController.createPost
  )
  .get(contentController.getAllPosts);

router
  .route('/:website/posts/:id')
  .post(contentController.getPost)
  .patch(
    authController.restrictTo('admin', 'editor', 'user'),
    contentController.getWebsiteUrl,
    contentController.editPost
  )
  .delete(
    authController.restrictTo('admin', 'editor', 'user'),
    contentController.deletePost
  );

export default router;
