import { Request, Response, NextFunction } from 'express';
declare const arcjetMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default arcjetMiddleware;
