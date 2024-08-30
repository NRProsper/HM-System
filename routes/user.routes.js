import express from 'express';
import { signUp,logIn, logout } from '../controllers/user.controller.js';
import { signUpValidations, logInValidations } from '../utils/validation.js';

export const userRouter = express.Router();

userRouter.post('/signup', signUpValidations, signUp);
userRouter.post('/login', logInValidations, logIn);
userRouter.get('/logout', logout);