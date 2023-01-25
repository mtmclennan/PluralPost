"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const contentController = __importStar(require("../controllers/contentController"));
const router = express_1.default.Router();
router.route('/:website/articles').get(contentController.getAllPublishedPosts);
router.route('/:website/post/:slug').post(contentController.getPostBySlug);
router
    .route('/:website/images/:id')
    .post(authController.protectPhoto, contentController.uploadContentPhoto, contentController.resizeContentPhoto, contentController.sendImageResponse);
router
    .route('/:website/featured-image/:id')
    .post(authController.protectPhoto, contentController.uploadContentPhoto, contentController.resizeContentPhoto, contentController.sendFeatureResponse);
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
exports.default = router;
