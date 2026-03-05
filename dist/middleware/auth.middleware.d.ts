import { Request, Response, NextFunction } from 'express';
declare const authorize: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default authorize;
