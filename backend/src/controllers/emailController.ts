import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { Email } from '../utils/email';

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

    await new Email(user, website).sendContactMessage({
      subject: req.body.topic,
      message: req.body.message,
      sender: req.body.email,
    });

    res.status(200).json({
      status: 'success',
    });
  }
);
