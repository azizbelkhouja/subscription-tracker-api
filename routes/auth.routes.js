import { Router } from "express";


const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
  // Handle user sign-up logic here
  res.send({title: 'User signed up successfully'});
});

authRouter.post('/sign-in', (req, res) => {
  // Handle user sign-in logic here
  res.send({title: 'User signed in successfully'});
});

authRouter.post('/sign-out', (req, res) => {
  // Handle user sign-out logic here
  res.send({title: 'User signed out successfully'});
});



