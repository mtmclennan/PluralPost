"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = __importDefault(require("html-to-text"));
class Email {
    constructor(user, url) {
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
        return nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    //Send actual email
    send(template, subject, message, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            //1) Render HTML based on a pug template
            const html = pug_1.default.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
                firstName: this.firstName,
                url: this.url,
                subject,
                message,
                sender,
            });
            // 2) Define the email options
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html,
                text: html_to_text_1.default.fromString(html),
            };
            // 3) Create transport and send email
            yield this.newTransport().sendMail(mailOptions);
        });
    }
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('welcome', 'Welcome to Sub List!', 'Hi Welcome', this.from);
        });
    }
    sendContactMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('contact', message.subject, message.message, message.sender);
        });
    }
    sendPasswordReset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('passwordReset', 'Your password reset token (only valid for 10 mins)');
        });
    }
}
exports.Email = Email;
