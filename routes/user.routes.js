import express from 'express';
import { createUser,logIn, logout } from '../controllers/auth.controller.js';
import { signUpValidations, logInValidations } from '../utils/validation.js';

const userRouter = express.Router();

userRouter.post('/signup', signUpValidations, createUser);
userRouter.post('/login', logInValidations, logIn);
userRouter.get('/logout', logout);

export default userRouter;
