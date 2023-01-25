import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import expressApp from './app';

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION!  SHUTING DOWN');
  console.log(err);
  process.exit(1);
});

if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
  const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
  const mongoDb = mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
  });

  // const options = {
  //   // dbName: website,
  //   dbName: 'yardOasis',
  // };
  // // const conn2 = mongoose
  // //   .createConnection(DB, options)
  // //   .asPromise()
  // //   .then(() => {
  // //     console.log('DB 2 Connected server');
  // //   });

  // // module.exports = conn2;

  const port = process.env.PORT || 3030;

  const server = expressApp.listen(port, () => {
    console.log(`App running on ${port}......`);
  });
  process.on('unhandledRejection', (err: any) => {
    console.log(err);
    console.log('UNHANDLED REJECTION!  SHUTING DOWN');
    console.log(err.name);
    server.close(() => process.exit(1));
  });
} else {
  console.log('ERROR!! No Database or Password');
}
