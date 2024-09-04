import express from 'express';
import userRouter from './user.routes.js';
import {contactRoute} from './contact-us.routes.js';
import departmentRoute  from './department.routes.js';

const routes = express.Router();

routes.use('/auth', userRouter);
routes.use("/contact-us",contactRoute);
routes.use('/departments', departmentRoute);

export default routes;