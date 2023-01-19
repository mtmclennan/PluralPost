import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { connect2DB } from '../models/connectModels';
import { sendEmail } from '../utils/sendEmail';
import { NextFunction, Request, Response } from 'express';
import { Subscriber } from '../types/interfaces';
import MailMessage from 'nodemailer/lib/mailer/mail-message';
import { sendEmailOne } from '../utils/sendEmailOne';

export const createSubscriber = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;

    const DBConnection = await connect2DB(website);
    const Subscriber = DBConnection.model<Subscriber>('Subscribers');

    const data = await Subscriber.create({
      name: req.body.name,
      email: req.body.email,
      websiteFrom: req.body.website || req.hostname,
    });

    console.log(data);

    const mailSub = {
      name: data.name,
      email: data.email,
    };

    await new sendEmailOne(mailSub, website).sendWelcome();

    res.status(201).json({
      status: 'success',
      data,
    });
  }
);

export const findSubscribers = async (website: string) => {
  const DBConnection = await connect2DB(website);
  const Subscriber = DBConnection.model<Subscriber>('Subscribers');
  const data = await Subscriber.find();
  return data;
};

export const getAllSubscribers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { website } = req.params;

    const data = await findSubscribers(website);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const deleteSubscriber = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { website } = req.params;

    const DBConnection = await connect2DB(website);
    const Subscriber = DBConnection.model<Subscriber>('Subscribers');

    const doc = await Subscriber.findByIdAndDelete(req.params.id.trim());
    if (!doc) {
      return next(new AppError('No document with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

export const sendSubscriberEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { website } = req.params;
    const subscribers = await findSubscribers(website);
    const mailList = subscribers.map((sub) => sub.email);

    const MailOptions = {
      email: mailList,
    };

    const message = {
      subject: req.body.subject,
      message: req.body.message,
      sender: req.body.sender,
    };

    await new sendEmail(MailOptions, website).sendContactMessage(message);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  }
);

// export const getSubscribersByWebsite = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const website = req.params.website;
//     const Subscriber = await DBconnect(website);
//     const data = await Subscriber.aggregate([
//       {
//         $match: { websiteFrom: `${website}` },
//       },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data,
//     });
//   }
// );

// export const emailSubscribersByWebsite = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const website = req.params.website;
//     const Subscriber = await DBconnect(website);
//     const data = await Subscriber.aggregate([
//       {
//         $match: { websiteFrom: `${website}` },
//       },
//     ]);

//     const url = `${website}`;

//     data.forEach(async (subscriber) => {
//       await new Email(subscriber, url).sendWelcome();
//     });

//     res.status(200).json({
//       status: 'success',
//       data: null,
//     });
//   }
// );
