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
exports.deleteUser = exports.getAllUsers = exports.updateMe = exports.getUser = exports.getMe = exports.resizeUserPhoto = exports.uploadUserPhoto = exports.deleteMe = void 0;
const userModel_1 = require("../models/userModel");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const handlerFactory_1 = require("./handlerFactory");
exports.deleteMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.UserModel.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
    });
}));
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new appError_1.default('Not an image!, Please upload only images.', 400)), false;
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    console.log(req.file.filename);
    // console.log(req.file);
    yield (0, sharp_1.default)(req.file.buffer)
        .withMetadata()
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
}));
const getMe = (req, res, next) => {
    if (req.user.id)
        req.params.id = req.user.id;
    next();
};
exports.getMe = getMe;
const getUser = (req, res) => {
    const user = res.locals.user;
    res.status(200).json({
        status: 'success',
        data: user,
    });
};
exports.getUser = getUser;
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
exports.updateMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Create error if user POSTS password data
    if (req.body.password || req.body.passwordConfirm)
        return next(new appError_1.default('This route is not for password update.  Please use updateMyPassword', 400));
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file)
        filteredBody.photo = req.file.filename;
    // 3) Update user document
    const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        user: updatedUser,
    });
}));
exports.getAllUsers = (0, handlerFactory_1.getAll)(userModel_1.UserModel);
exports.deleteUser = (0, handlerFactory_1.deleteOne)(userModel_1.UserModel);
