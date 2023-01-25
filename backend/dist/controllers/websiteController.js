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
exports.getAllWebsites = exports.getWebsite = exports.findWebsiteByName = exports.editWebsite = exports.createWebsite = void 0;
const websiteModel_1 = __importDefault(require("../models/websiteModel"));
const handlerFactory_1 = require("./handlerFactory");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createWebsite = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield websiteModel_1.default.create({
        name: req.body.name,
        url: req.body.url,
        category: req.body.category,
        logo: req.body.logo,
        slogan: req.body.slogan,
        email: req.body.email,
        emailFromSite: req.body.emailFromSiteName,
    });
    res.status(201).json({
        status: 'success',
        data,
    });
}));
exports.editWebsite = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedWebsite = yield websiteModel_1.default.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        url: req.body.url,
        category: req.body.category,
        logo: req.body.logo,
        slogan: req.body.slogan,
        email: req.body.email,
        emailFromSite: req.body.emailFromSiteName,
    }, { new: true });
    res.status(200).json({
        status: 'success',
        data: updatedWebsite,
    });
}));
const findWebsiteByName = (website) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield websiteModel_1.default.find({ name: website });
    return data;
});
exports.findWebsiteByName = findWebsiteByName;
exports.getWebsite = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield websiteModel_1.default.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data,
    });
}));
exports.getAllWebsites = (0, handlerFactory_1.getAll)(websiteModel_1.default);
