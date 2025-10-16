import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {res.send(`GET all subscriptions`)});

subscriptionRouter.get('/:id', (req, res) => {res.send(`GET subscription details`)});

subscriptionRouter.post('/', (req, res) => {res.send(`CREATE subscription`)});

subscriptionRouter.put('/:id', (req, res) => {res.send(`UPDATE subscription`)});

subscriptionRouter.delete('/:id', (req, res) => {res.send(`DELETE subscriptions`)});

subscriptionRouter.get('/user/:id', (req, res) => {res.send(`GET all subscriptions for specified user`)});

subscriptionRouter.get('/:id/cancel', (req, res) => {res.send(`CANCEL subscription`)});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {res.send(`GET Upcoming subscription`)});


export default subscriptionRouter;