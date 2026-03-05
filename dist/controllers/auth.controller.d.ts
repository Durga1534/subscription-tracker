import { Request, Response, NextFunction } from 'express';
export declare const signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const signOut: (req: Request, res: Response, next: NextFunction) => Promise<void>;
