/// <reference path="../types/index.d.ts" />
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/errors.js';
import { signUpSchema, signInSchema } from '../schemas/auth.schema.js';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = signUpSchema.parse(req.body);
    const { name, email, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session },
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = signInSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Implement sign out logic if needed
  res.status(200).json({ success: true, message: 'Signed out successfully' });
};
