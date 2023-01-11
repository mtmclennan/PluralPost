export {};
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/interfaces';
import catchAsync from '../utils/catchAsync';
import jwt from 'jwt-promisify';
import crypto from 'crypto';
import { Email } from '../utils/email';
import { UserModel } from '../models/userModel';
import AppError from '../utils/appError';
import { CLIENT_RENEG_LIMIT } from 'tls';
// import { token } from 'morgan';

const signToken = (id: string) => {
  console.log('here id', id);
  console.log(process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (
  user: User,
  statusCode: number,
  res: Response
) => {
  console.log('user', user);
  const token = await signToken(user._id.toString());

  type CookieOptions = {
    expires: Date;
    httpOnly: boolean;
    secure?: boolean;
  };

  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  console.log(token);
  res.cookie('jwt', token, cookieOptions);

  //remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // 1) email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    // 2) check if user exists && password is correct
    const user = await UserModel.findOne({ email }).select('+password');

    console.log(user);
    if (
      !user ||
      (user &&
        user.correctPassword &&
        user.password &&
        !(await user.correctPassword(password, user.password)))
    ) {
      return next(new AppError('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  }
);

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await UserModel.create({
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
  }
);

export const protectPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token!) {
      return next(
        new AppError('You are not logged in!, Please log in to get access', 401)
      );
    }

    if (token !== process.env.JWT_PHOTO) {
      return next(new AppError('Photo upload not authorized', 401));
    }

    next();
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token!) {
      return next(
        new AppError('You are not logged in!, Please log in to get access', 401)
      );
    }
    // 2) Validate token
    console.log('token', token);

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if the user still exists
    const freshUser = await UserModel.findById(decoded.id);
    if (!freshUser) {
      return next(
        new AppError('The user belonging to the token no longer exists', 401)
      );
    }
    // 4) Check if user changed password after token was issued
    if (
      freshUser.changedPasswordAfter &&
      freshUser.changedPasswordAfter(decoded.id)
    ) {
      return next(
        new AppError(
          'User recently changed password!  Please log in again.',
          401
        )
      );
    }

    //Grant ACCESS To PROTECTED ROUTE
    req.user = freshUser;
    res.locals.user = freshUser;
    next();
  }
);

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      // 3) Check if the user still exists
      const currentUser = await UserModel.findById(decoded.id);
      if (!currentUser) {
        console.log('no user');
        return next();
      }

      // 4) Check if user changed password after token was issued
      if (
        currentUser.changedPasswordAfter &&
        currentUser.changedPasswordAfter(decoded.id)
      ) {
        console.log('Password changed');
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      console.log('logged in');
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

export const logout = (req: Request, res: Response) => {
  console.log('Logged out');
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1 ) Get user based on posted email
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address'));
    }
    // 2) gernerate the random token

    if (user.createPasswordToken) {
      const resetToken = user.createPasswordToken();
      // console.log(resetToken);
      await user.save({ validateBeforeSave: false });
      //3 ) Send it to user's email

      try {
        const resetURL = `${req.protocol}://${req.get(
          'host'
        )}/resetPassword/${resetToken}`;

        const mailUser = {
          name: user.name,
          email: user.email,
        };

        await new Email(mailUser, resetURL).sendPasswordReset();
        res.status(200).json({
          status: 'success',
          message: 'Token sent to email',
        });
      } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
      }

      return next(
        new AppError(
          'There was an error sending the email. Try again later!',
          500
        )
      );
    }
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //roles is an array ['admin', 'lead-guide'] role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return next(new AppError('Token is invaild or expired', 400));

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.user.id).select('+password');

    if (user) {
      if (
        user.correctPassword &&
        user.password &&
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
      )
        return next(new AppError('Your current password is incorrect', 401));

      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      await user.save();
      // 4) Log user in, send JWT
      createSendToken(user, 200, res);
    } else {
      return next(new AppError('Could not find user'));
    }
  }
);

export const renderLoginView = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user) return next();
    const isUser = await UserModel.exists({
      role: 'admin',
    });

    // console.log('is there an admin');
    if (!isUser) return next();

    //  if (!isUser) return res.redirect('/signup');

    res.redirect('/login');
  }
);

export const checkIfAdminExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user) return next();
    const isUser = await UserModel.exists({
      role: 'admin',
    });
    if (!isUser) {
      console.log('Noadmin');
      req.app.locals.role = 'noAdmin';
    }
    next();
  }
);
