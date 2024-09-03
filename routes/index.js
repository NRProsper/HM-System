import express from 'express';
import {userRouter} from './user.routes.js';
import {contactRoute} from './contact-us.routes.js';
import { departmentRoute } from './department.routes.js';

export const routes = express.Router();

routes.use('/user', userRouter);
routes.use("/contact-us",contactRoute);
routes.use('/department',departmentRoute);