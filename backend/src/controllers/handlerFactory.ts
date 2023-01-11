import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { NextFunction, Request, Response } from 'express';

export const getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.find();
    res.status(200).json({
      status: 'success',
      data,
    });
  });
export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
