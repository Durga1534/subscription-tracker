import { Router, type Request, type Response } from 'express';
import authorize from '../middleware/auth.middleware.js';
import {
  createSubscription,
  getUserSubscriptions,
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req: Request, res: Response) =>
  res.send({ title: 'GET all susbscriptions' }),
);
subscriptionRouter.get('/:id', (req: Request, res: Response) =>
  res.send({ title: 'GET subcription details' }),
);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', (req: Request, res: Response) =>
  res.send({ title: 'UPDATE susbscription' }),
);
subscriptionRouter.delete('/:id', (req: Request, res: Response) =>
  res.send({ title: 'DELETE susbscription' }),
);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.put('/:id/cancel', (req: Request, res: Response) =>
  res.send({ title: 'CANCEL susbscription' }),
);
subscriptionRouter.get('/upcoming-renewals', (req: Request, res: Response) =>
  res.send({ title: 'GET upcoming renewals' }),
);

export default subscriptionRouter;
