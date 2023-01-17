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
exports.checkIfAdminExists = exports.renderLoginView = exports.updatePassword = exports.consoleLog = exports.resetPassword = exports.restrictTo = exports.forgotPassword = exports.logout = exports.isLoggedIn = exports.protect = exports.protectPhoto = exports.signUp = exports.login = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jwt_promisify_1 = __importDefault(require("jwt-promisify"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const userModel_1 = require("../models/userModel");
const appError_1 = __importDefault(require("../utils/appError"));
// import { token } from 'morgan';
const signToken = (id) => {
    console.log('here id', id);
    console.log(process.env.JWT_EXPIRES_IN);
    return jwt_promisify_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('user', user);
    const token = yield signToken(user._id.toString());
    const cookieOptions = {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    console.log(token);
    res.cookie('jwt', token, cookieOptions);
    //remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    });
});
exports.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // 1) email and password exist
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password', 400));
    }
    // 2) check if user exists && password is correct
    const user = yield userModel_1.UserModel.findOne({ email }).select('+password');
    console.log(user);
    if (!user ||
        (user &&
            user.correctPassword &&
            user.password &&
            !(yield user.correctPassword(password, user.password)))) {
        return next(new appError_1.default('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
}));
exports.signUp = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role,
    });
    //   const url = `${req.protocol}://${req.get('host')}/me`;
    //   console.log(url);
    //   await new Email(newUser, url).sendWelcome();
    // createSendToken(newUser, 201, res);
    res.status(200).json({
        status: 'success',
    });
}));
exports.protectPhoto = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in!, Please log in to get access', 401));
    }
    if (token !== process.env.JWT_PHOTO) {
        return next(new appError_1.default('Photo upload not authorized', 401));
    }
    next();
}));
exports.protect = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if no admin bypass protect
    if (req.app.locals.role === 'noAdmin') {
        req.user = {
            name: 'newAdmin',
            _id: Math.random().toString(),
            role: 'admin',
            email: 'newuser@noemail.com',
            createdAt: Date.now(),
            password: 'password1234',
        };
        req.app.locals.role = undefined;
        return next();
    }
    // 1) Get token and check if exists
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in!, Please log in to get access', 401));
    }
    // 2) Validate token
    console.log('token', token);
    const decoded = yield jwt_promisify_1.default.verify(token, process.env.JWT_SECRET);
    // 3) Check if the user still exists
    const freshUser = yield userModel_1.UserModel.findById(decoded.id);
    if (!freshUser) {
        return next(new appError_1.default('The user belonging to the token no longer exists', 401));
    }
    // 4) Check if user changed password after token was issued
    if (freshUser.changedPasswordAfter &&
        freshUser.changedPasswordAfter(decoded.id)) {
        return next(new appError_1.default('User recently changed password!  Please log in again.', 401));
    }
    //Grant ACCESS To PROTECTED ROUTE
    req.user = freshUser;
    res.locals.user = freshUser;
    next();
}));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.jwt) {
        try {
            const decoded = yield jwt_promisify_1.default.verify(req.cookies.jwt, process.env.JWT_SECRET);
            // 3) Check if the user still exists
            const currentUser = yield userModel_1.UserModel.findById(decoded.id);
            if (!currentUser) {
                console.log('no user');
                return next();
            }
            // 4) Check if user changed password after token was issued
            if (currentUser.changedPasswordAfter &&
                currentUser.changedPasswordAfter(decoded.id)) {
                console.log('Password changed');
                return next();
            }
            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            console.log('logged in');
            return next();
        }
        catch (err) {
            return next();
        }
    }
    next();
});
exports.isLoggedIn = isLoggedIn;
const logout = (req, res) => {
    console.log('Logged out');
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
exports.forgotPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1 ) Get user based on posted email
    const user = yield userModel_1.UserModel.findOne({ email: req.body.email });
    if (!user) {
        return next(new appError_1.default('There is no user with email address'));
    }
    // 2) gernerate the random token
    if (user.createPasswordToken) {
        const resetToken = user.createPasswordToken();
        // console.log(resetToken);
        yield user.save({ validateBeforeSave: false });
        //3 ) Send it to user's email
        try {
            const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
            const mailUser = {
                name: user.name,
                email: user.email,
            };
            yield new email_1.Email(mailUser, resetURL).sendPasswordReset();
            res.status(200).json({
                status: 'success',
                message: 'Token sent to email',
            });
        }
        catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save({ validateBeforeSave: false });
        }
        return next(new appError_1.default('There was an error sending the email. Try again later!', 500));
    }
}));
const restrictTo = (...roles) => {
    return (req, res, next) => {
        //roles is an array ['admin', 'lead-guide'] role='user'
        if (!roles.includes(req.user.role)) {
            return next(new appError_1.default('You do not have permission to perform this action', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
exports.resetPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user based on the token
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = yield userModel_1.UserModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
        return next(new appError_1.default('Token is invaild or expired', 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    yield user.save();
    createSendToken(user, 200, res);
}));
const consoleLog = () => {
    console.log('MADE IT HERE');
};
exports.consoleLog = consoleLog;
exports.updatePassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.UserModel.findById(req.user.id).select('+password');
    if (user) {
        if (user.correctPassword &&
            user.password &&
            !(yield user.correctPassword(req.body.passwordCurrent, user.password)))
            return next(new appError_1.default('Your current password is incorrect', 401));
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        yield user.save();
        // 4) Log user in, send JWT
        createSendToken(user, 200, res);
    }
    else {
        return next(new appError_1.default('Could not find user'));
    }
}));
exports.renderLoginView = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.user)
        return next();
    const isUser = yield userModel_1.UserModel.exists({
        role: 'admin',
    });
    // console.log('is there an admin');
    if (!isUser)
        return next();
    //  if (!isUser) return res.redirect('/signup');
    res.redirect('/login');
}));
exports.checkIfAdminExists = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.user)
        return next();
    const isUser = yield userModel_1.UserModel.exists({
        role: 'admin',
    });
    if (!isUser) {
        console.log('Noadmin');
        req.app.locals.role = 'noAdmin';
    }
    next();
}));
