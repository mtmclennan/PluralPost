import express from 'express';
import * as authController from '../controllers/authController';
import * as contentController from '../controllers/contentController';

const router = express.Router();

router.route('/:website/articles').get(contentController.getAllPublishedPosts);

router.route('/:website/post/:slug').post(contentController.getPostBySlug);
router
  .route('/:website/images/:id')
  .post(
    authController.protectPhoto,
    contentController.uploadContentPhoto,
    contentController.resizeContentPhoto,
    contentController.sendImageResponse
  );

router
  .route('/:website/featured-image/:id')
  .post(
    authController.protectPhoto,
    contentController.uploadContentPhoto,
    contentController.resizeContentPhoto,
    contentController.sendFeatureResponse
  );

router.use(authController.protect);
router
  .route('/:website/posts')
  .post(contentController.createPost)
  .get(contentController.getAllPosts);

router
  .route('/:website/posts/:id')
  .post(contentController.getPost)
  .patch(contentController.getWebsiteUrl, contentController.editPost)
  .delete(contentController.deletePost);

export default router;
