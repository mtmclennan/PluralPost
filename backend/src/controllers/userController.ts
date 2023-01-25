import { UserModel as User } from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import multer from 'multer';
import sharp from 'sharp';
import { getAll, deleteOne } from './handlerFactory';
import { NextFunction, Request, Response } from 'express';

type Maybe<T> = T | null | undefined;
type ResponseCallback<T> = (err: Error | null, payload?: Maybe<T>) => void;

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
    });
  }
);

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: ResponseCallback<unknown>
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!, Please upload only images.', 400)), false;
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .withMetadata()
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  }
);

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id) req.params.id = req.user.id;
  next();
};

export const getUser = (req: Request, res: Response) => {
  const user = res.locals.user;

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

const filterObj = (obj: any, ...allowedFields: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTS password data
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          'This route is not for password update.  Please use updateMyPassword',
          400
        )
      );

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      user: updatedUser,
    });
  }
);

export const getAllUsers = getAll(User);
export const deleteUser = deleteOne(User);
