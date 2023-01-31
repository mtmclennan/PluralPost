import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'A New Post',
    trim: true,
  },
  featuredImage: {
    type: String,
  },
  photoCaption: {
    type: String,
  },
  tags: {
    type: String,
  },
  slug: {
    type: String,
    trim: true,
    unique: true,
  },
  author: {
    type: String,
  },
  dateModified: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  datePublished: {
    type: Date,
  },
  description: {
    type: String,
  },
  postBody: {
    type: String,
  },
  published: {
    type: String,
    default: 'draft',
  },
});

export type PostType = typeof postSchema;
