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
exports.updateEmail = exports.createEmail = exports.getAllEmails = exports.getOneEmail = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendEmail_1 = require("../utils/sendEmail");
const connectModels_1 = require("../models/connectModels");
const subscribeController_1 = require("./subscribeController");
const appError_1 = __importDefault(require("../utils/appError"));
const websiteController_1 = require("./websiteController");
const emailModel = (website) => __awaiter(void 0, void 0, void 0, function* () {
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const email = DB.model('Email');
    return email;
});
exports.getOneEmail = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const Email = yield emailModel(website);
    const data = yield Email.findById(req.params.id);
    if (!data) {
        return next(new appError_1.default('No document with that ID', 404));
    }
    // console.log(data);
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.getAllEmails = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Email = yield emailModel(req.params.website);
    const data = yield Email.find();
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.createEmail = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const website = req.params.website;
    const DB = yield (0, connectModels_1.connect2DB)(website);
    const Email = DB.model('Email');
    let date;
    if (!req.body.dateModified) {
        date = undefined;
    }
    const data = yield Email.create({
        subject: req.body.subject,
        author: req.user._id,
        dateModified: date,
        message: req.body.message,
    });
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.updateEmail = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Email = yield emailModel(req.params.website);
    let date;
    if (!req.body.dateModified) {
        date = undefined;
    }
    let status;
    if (!req.body.status) {
        status = undefined;
    }
    if (req.body.status === 'SEND') {
        const [website] = yield (0, websiteController_1.findWebsiteByName)(req.params.website);
        const subscribers = yield (0, subscribeController_1.findSubscribers)(req.params.website);
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
        yield new sendEmail_1.sendEmail(mailOptions, website.url).sendContactMessage(message);
        status = 'SENT';
    }
    else {
        status = req.body.status;
    }
    const data = yield Email.findByIdAndUpdate(req.params.id, {
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
}));
