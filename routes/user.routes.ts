/// <reference path="../types/index.d.ts" />
import { Router, type Request, type Response } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { getUser, getUsers } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.post('/', (req: Request, res: Response) => res.send({ title: 'CREATE new users' }));
userRouter.put('/:id', (req: Request, res: Response) => res.send({ title: 'UPDATE user' }));
userRouter.delete('/:id', (req: Request, res: Response) => res.send({ title: 'DELETE user' }));

export default userRouter;
