import { NextFunction, Request, Response } from 'express';
import express from 'express';
import path from 'path';
import userRouter from './routes/userRoutes';
import websiteRouter from './routes/websiteRoutes';
import subcriberRouter from './routes/subscribeRoutes';
import contentRouter from './routes/contentRoutes';
import emailRouter from './routes/emailRoutes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';

const app = express();

app.set('views', path.join(__dirname, 'views'));

//Globel Middleware
// Set security headers
// app.use(
//   helmet({ crossOriginEmbedderPolicy: false, crossOriginResourcePolicy: false })
// );
const scriptSources = ["'self'", "'unsafe-inline'", 'https://unpkg.com'];
const styleSources = [
  "'self'",
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3030',
      'http://localhost:3003',
    ],
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: [
        'self',
        'http://localhost:3000',
        'http://localhost:3030',
        'http://localhost:3003',
      ],
      fontSrc: [
        'self',
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com',
      ],
      scriptSrc: scriptSources,
      scriptSrcElem: scriptSources,
      styleSrc: styleSources,
    },
  })
);
app.use(express.static('public'));

// Development logging
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 1 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 15min!',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);
// Unencode data from html form submited to server
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());
// Protection from HTTP paramater pollution (hpp)
app.use(hpp());

// Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middlware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   // console.log(req.cookies);

//   next();
// });
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
//route handlers

// 3) ROUTES

app.use('/api/v1/subscribers', subcriberRouter);
app.use('/api/v1/websites', websiteRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/email', emailRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);
export default app;
