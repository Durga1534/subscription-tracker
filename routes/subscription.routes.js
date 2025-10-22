import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'GET all susbscriptions'}));

subscriptionRouter.get('/:id', (req, res) => res.send({title: 'GET subcription details'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'UPDATE susbscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'DELETE susbscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL susbscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}));


export default subscriptionRouter;