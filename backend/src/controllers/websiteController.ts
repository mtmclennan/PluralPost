import Website from '../models/websiteModel';
import { getAll } from './handlerFactory';
import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { WebsiteType } from '../types/interfaces';

export const createWebsite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Website.create({
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
  }
);

export const editWebsite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedWebsite = await Website.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        url: req.body.url,
        category: req.body.category,
        logo: req.body.logo,
        slogan: req.body.slogan,
        email: req.body.email,
        emailFromSite: req.body.emailFromSiteName,
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedWebsite,
    });
  }
);

export const findWebsiteByName = async (website: string) => {
  const data = await Website.find<WebsiteType>({ name: website });

  return data;
};

export const getWebsite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Website.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);
export const getAllWebsites = getAll(Website);
