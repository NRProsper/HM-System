import express from 'express';
import {createUser, logIn, logout} from '../controllers/auth.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', logIn);
userRouter.get('/logout', logout);

export default userRouter;
