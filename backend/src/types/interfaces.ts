import mongoose from 'mongoose';

export interface User {
  name: string;
  _id: string;
  id?: string;
  email: string;
  role: string;
  createdAt: number | Date;
  photo?: string;
  password?: string | undefined;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
  correctPassword?: String2BoolFunc;
  changedPasswordAfter?: Number1BoolFunc;
  createPasswordToken?: () => string;
}

export interface Post {
  title: string;
  featuredImage: string;
  photoCaption: string;
  tags: string;
  slug: string;
  author: string;
  dateModified: mongoose.Date;
  datePublished: Date;
  description: string;
  published: string;
  postBody: string;
}

export interface Subscriber {
  name: string;
  email: string;
  createdAt: mongoose.Date;
  websiteFrom?: string;
}

export interface Contactor {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  message: string;
}

export interface EmailUser {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  from?: string;
}
