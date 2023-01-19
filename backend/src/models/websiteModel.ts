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
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    trim: true,
  },
  sloggan: {
    type: String,
    trim: true,
  },
  emailAddress: {
    type: String,
    trim: true,
  },
  emailFromSiteName: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: String,
    default: 'http://localhost:3030/img/websites/default.svg',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Website = mongoose.model<WebsiteType>('Website', websiteSchema);

export default Website;

// export type WebsiteType = typeof Website;
