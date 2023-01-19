import mongoose, { Schema } from 'mongoose';

export const emailSchema = new mongoose.Schema({
  subject: {
    type: String,
    trim: true,
    default: 'New Email',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateModified: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  dateSent: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    default: 'draft',
  },
  message: {
    type: String,
    trim: true,
  },
});

emailSchema.pre('find', function (next) {
  this.populate('author');
  next();
});

export type EmailType = typeof emailSchema;
