"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getWebsiteUrl = exports.editPost = exports.getAllPublishedPosts = exports.getAllPosts = exports.getPostBySlug = exports.getPost = exports.sendFeatureResponse = exports.sendImageResponse = exports.resizeContentPhoto = exports.uploadContentPhoto = void 0;
const fs_1 = __importDefault(require("fs"));
const appError_1 = __importDefault(require("../utils/appError"));
const multer_1 = __importDefault(require("multer"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sharp_1 = __importDefault(require("sharp"));
const connectModels_1 = require("../models/connectModels");
const websiteModel_1 = __importDefault(require("../models/websiteModel"));
const sendBuildHook_1 = __importDefault(require("../utils/sendBuildHook"));
const conPostModelToDB = (website) => __awaiter(void 0, void 0, void 0, function* () {
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    return Post;
});
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new appError_1.default('Not an image!, Please upload only images.', 400)), false;
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.uploadContentPhoto = upload.single('upload');
exports.resizeContentPhoto = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next();
    req.file.filename = `post-${req.params.id}-${req.file.originalname.split('.')[0]}-${Date.now()}.jpeg`;
    const dir = `${process.env.IMAGE_STORAGE_POSTS}${req.params.website}/posts`;
    fs_1.default.mkdir(dir, { recursive: true }, (err) => {
        if (err)
            throw new appError_1.default(err);
    });
    yield (0, sharp_1.default)(req.file.buffer)
        .withMetadata()
        .resize(800, 400)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`${dir}/${req.file.filename}`);
    res.locals.dir = dir.slice(11);
    next();
}));
const sendImageResponse = (req, res, next) => {
    if (!req.file)
        return next;
    const photoUrl = `${process.env.SERVER_URL}${res.locals.dir}/${req.file.filename}`;
    res.status(200).json({
        status: 'success',
        url: photoUrl,
    });
};
exports.sendImageResponse = sendImageResponse;
exports.sendFeatureResponse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next;
    const photoUrl = `${process.env.SERVER_URL}${res.locals.dir}/${req.file.filename}`;
    const Post = yield conPostModelToDB(req.params.website);
    yield Post.findByIdAndUpdate(req.params.id, {
        featuredImage: photoUrl,
    }, { new: true });
    res.status(200).json({
        status: 'success',
        url: photoUrl,
    });
}));
exports.getPost = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    const data = yield Post.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.getPostBySlug = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    const data = yield Post.findOne({ slug: req.params.slug });
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.getAllPosts = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const DB = yield (0, connectModels_1.connect2DB)(req.params.website);
    const Post = DB.model('Post');
    const data = yield Post.find();
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.getAllPublishedPosts = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    const data = yield Post.find({ published: 'published' });
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.editPost = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    const data = yield Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        featuredImage: req.body.featuredImage,
        photoCaption: req.body.photoCaption,
        tags: req.body.tags,
        slug: req.body.slug,
        author: req.body.author,
        dateModified: req.body.date,
        description: req.body.description,
        postBody: req.body.postBody,
        published: req.body.published,
    });
    let response;
    if (data) {
        response = yield (0, sendBuildHook_1.default)(req, res);
    }
    res.status(200).json({
        status: 'success',
        response,
    });
}));
exports.getWebsiteUrl = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const data = yield websiteModel_1.default.findOne({ name: website });
    if (data && data.url) {
        res.locals.url = data.url;
    }
    next();
}));
exports.createPost = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    let date;
    if (!req.body.dateModified) {
        date = undefined;
    }
    const data = yield Post.create({
        title: req.body.title,
        featuredImage: req.body.featuredImage,
        photoCaption: req.body.photoCaption,
        tags: req.body.tags,
        slug: req.body.slug,
        author: req.body.author,
        dateModified: date,
        description: req.body.description,
        postBody: req.body.postBody,
    });
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.deletePost = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Post = DB.model('Post');
    const doc = yield Post.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new appError_1.default('No document with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
}));
