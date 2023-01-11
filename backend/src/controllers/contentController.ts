import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import multer, { FileFilterCallback } from 'multer';
import catchAsync from '../utils/catchAsync';
import sharp from 'sharp';
import { connect2DB } from '../models/connectModels';
import Website from '../models/websiteModel';
import sendBuildHook from '../utils/sendBuildHook';
import { Post } from '../types/interfaces';

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!, Please upload only images.', 400)), false;
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadContentPhoto = upload.single('upload');

export const resizeContentPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `post-${req.file.originalname}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .withMetadata()
      .resize(800, 400)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(`${process.env.IMAGE_STORAGE_POSTS}${req.file.filename}`);

    next();
  }
);

export const sendResponce = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next;
  const photoUrl = `http://localhost:3030/img/posts/${req.file.filename}`;

  res.status(200).json({
    status: 'success',
    url: photoUrl,
  });
};

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);
    const Post = DB.model<Post>('Post');
    const data = await Post.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const getPostBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);

    const Post = DB.model<Post>('Post');

    const data = await Post.findOne({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const DB = await connect2DB(req.params.website);
    const Post = DB.model<Post>('Post');

    const data = await Post.find();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const getAllPublishedPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);
    const Post = DB.model<Post>('Post');

    const data = await Post.find({ published: 'published' });

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const editPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);
    const Post = DB.model<Post>('Post');

    const data = await Post.findByIdAndUpdate(req.params.id, {
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
      response = await sendBuildHook(req, res);
    }

    res.status(200).json({
      status: 'success',
      response,
    });
  }
);

export const getWebsiteUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const data = await Website.findOne({ name: website });

    res.locals.url = data.url;

    next();
  }
);

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);

    const Post = DB.model<Post>('Post');

    let date;
    if (!req.body.dateModified) {
      date = undefined;
    }

    const data = await Post.create({
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
  }
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);
    const Post = DB.model<Post>('Post');

    const doc = await Post.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
