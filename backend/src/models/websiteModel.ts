import mongoose from 'mongoose';
import { WebsiteType } from '../types/interfaces';

const websiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input a website name.'],
    trim: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    trim: true,
  },
  slogan: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  emailFromSite: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: String,
    default: `${process.env.SERVER_URL}img/websites/default.svg`,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Website = mongoose.model<WebsiteType>('Website', websiteSchema);

export default Website;

// export type WebsiteType = typeof Website;
