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
exports.sendSubscriberEmail = exports.deleteSubscriber = exports.getAllSubscribers = exports.findSubscribers = exports.createSubscriber = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const connectModels_1 = require("../models/connectModels");
const sendEmail_1 = require("../utils/sendEmail");
const sendEmailOne_1 = require("../utils/sendEmailOne");
exports.createSubscriber = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DBConnection = yield (0, connectModels_1.connect2DB)(website);
    const Subscriber = DBConnection.model('Subscribers');
    const data = yield Subscriber.create({
        name: req.body.name,
        email: req.body.email,
        websiteFrom: req.body.website || req.hostname,
    });
    console.log(data);
    const mailSub = {
        name: data.name,
        email: data.email,
    };
    yield new sendEmailOne_1.sendEmailOne(mailSub, website).sendWelcome();
    res.status(201).json({
        status: 'success',
        data,
    });
}));
const findSubscribers = (website) => __awaiter(void 0, void 0, void 0, function* () {
    const DBConnection = yield (0, connectModels_1.connect2DB)(website);
    const Subscriber = DBConnection.model('Subscribers');
    const data = yield Subscriber.find();
    return data;
});
exports.findSubscribers = findSubscribers;
exports.getAllSubscribers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { website } = req.params;
    const data = yield (0, exports.findSubscribers)(website);
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.deleteSubscriber = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { website } = req.params;
    const DBConnection = yield (0, connectModels_1.connect2DB)(website);
    const Subscriber = DBConnection.model('Subscribers');
    const doc = yield Subscriber.findByIdAndDelete(req.params.id.trim());
    if (!doc) {
        return next(new appError_1.default('No document with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
}));
exports.sendSubscriberEmail = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { website } = req.params;
    const subscribers = yield (0, exports.findSubscribers)(website);
    const mailList = subscribers.map((sub) => sub.email);
    const MailOptions = {
        email: mailList,
    };
    const message = {
        subject: req.body.subject,
        message: req.body.message,
        sender: req.body.sender,
    };
    yield new sendEmail_1.sendEmail(MailOptions, website).sendContactMessage(message);
    res.status(200).json({
        status: 'success',
        data: null,
    });
}));
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
