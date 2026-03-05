import { Request, Response, NextFunction } from 'express';
export declare const createSubscription: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserSubscriptions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
