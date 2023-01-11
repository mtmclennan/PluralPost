import { SubscriberType } from '../models/subscriberModel';
import { EmailUser, Subscriber, User } from '../types/interfaces';
import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';

// new Email(user, url).sendWelcome();

interface Message {
  subject: string;
  sender: string;
  message: string;
}

export class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: EmailUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = user.from
      ? `${user.firstName} ${user.lastName} <${user.from}>`
      : `Matt McLennan <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   return 1;
    // }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //Send actual email
  async send(
    template: string,
    subject: string,
    message?: string,
    sender?: string
  ) {
    //1) Render HTML based on a pug template

    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
        message,
        sender,
      }
    );
    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Sub List!', 'Hi Welcome', this.from);
  }

  async sendContactMessage(message: Message) {
    await this.send(
      'contact',
      message.subject,
      message.message,
      message.sender
    );
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (only valid for 10 mins)'
    );
  }
}
