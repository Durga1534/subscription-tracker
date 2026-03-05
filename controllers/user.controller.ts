/// <reference path="../types/index.d.ts" />
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';
import { NotFoundError } from '../utils/errors.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
