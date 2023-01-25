import mongoose from 'mongoose';
import { emailSchema } from './emailModel';
import { postSchema } from './contentModel';
import { subscriberSchema } from './subscriberModel';

export const connect2DB = async (website: string) => {
  const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

  const conn = mongoose.connection.useDb(website, { useCache: true });
  // console.log('DB 2 connected conn2');
  // const conn = await mongoDb.useDb(website);
  conn.model('Subscribers', subscriberSchema);
  conn.model('Post', postSchema);
  conn.model('Email', emailSchema);

  return conn;
};
