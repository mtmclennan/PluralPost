import mongoose from 'mongoose';
import validator from 'validator';
import { Subscriber } from '../types/interfaces';

// include date created in database
// include the site the subscriber came from - ? can get this from req.protocol.host

export const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please tell use your email!'],
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  websiteFrom: {
    type: String,
    required: true,
  },
});

export type SubscriberType = typeof subscriberSchema;
// const Subscriber = mongoose.model('subscriber', subscriberSchema);

// module.exports = Subscriber;
