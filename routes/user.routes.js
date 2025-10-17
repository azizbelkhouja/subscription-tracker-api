import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, (req, res) => {res.send(`GET all users`)});
userRouter.post('/', authorize, (req, res) => {res.send(`CREATE user`)});
userRouter.get('/:id', (req, res) => {res.send(`GET user by id`)});
userRouter.put('/:id', (req, res) => {res.send(`UPDATE user by id`)});
userRouter.delete('/:id', (req, res) => {res.send(`DELETE user by id`)});

export default userRouter;