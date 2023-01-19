import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { sendEmail } from '../utils/sendEmail';
import { EmailType } from '../models/emailModel';
import { connect2DB } from '../models/connectModels';
import { findSubscribers } from './subscribeController';
import Website from '../models/websiteModel';
import mongoose from 'mongoose';
import AppError from '../utils/appError';
import { findWebsiteByName } from './websiteController';

export const contactFormEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    console.log(req.body);
    const user = {
      email: 'yardoasis@gmail.com',
      name: website,
      from: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    await new sendEmail(user, website).sendContactMessage({
      subject: req.body.topic,
      message: req.body.message,
      sender: req.body.email,
    });

    res.status(200).json({
      status: 'success',
    });
  }
);

const emailModel = async (website: string) => {
  const DB = await connect2DB(website);
  const email = DB.model<EmailType>('Email');

  return email;
};

export const getOneEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;

    const Email = await emailModel(website);

    const data = await Email.findById(req.params.id);

    if (!data) {
      return next(new AppError('No document with that ID', 404));
    }
    // console.log(data);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const getAllEmails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Email = await emailModel(req.params.website);

    const data = await Email.find();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const createEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const website = req.params.website;
    const DB = await connect2DB(website);

    const Email = DB.model<EmailType>('Email');

    let date;
    if (!req.body.dateModified) {
      date = undefined;
    }

    const data = await Email.create({
      subject: req.body.subject,
      author: req.user._id,
      dateModified: date,
      message: req.body.message,
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const updateEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Email = await emailModel(req.params.website);

    let date;
    if (!req.body.dateModified) {
      date = undefined;
    }
    let status;
    if (!req.body.status) {
      status = undefined;
    }

    if (req.body.status === 'SEND') {
      const [website] = await findWebsiteByName(req.params.website);

      const subscribers = await findSubscribers(req.params.website);
      const mailList = subscribers.map((sub) => sub.email);

      const mailOptions = {
        email: mailList,
        from: website.emailAddress,
        firstname: website.name,
      };

      const message = {
        subject: req.body.subject,
        message: req.body.message,
        sender: website.name,
      };

      await new sendEmail(mailOptions, website.url).sendContactMessage(message);

      status = 'SENT';
    } else {
      status = req.body.status;
    }

    const data = await Email.findByIdAndUpdate(req.params.id, {
      subject: req.body.subject,
      author: req.user._id,
      dateModified: date,
      message: req.body.message,
      status,
    });

    res.status(201).json({
      status: 'success',
      data,
    });
  }
);
