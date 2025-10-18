import {Router} from 'express';

const workflowRouter = Router();

workflowRouter.post('/start', (req, res) => {res.send(`START a new workflow`)});

workflowRouter.get('/:id/status', (req, res) => {res.send(`GET workflow status`)});