import express from 'express';
import userRouter from './user.routes.js';
import contactRoute from './contact-us.routes.js';
import departmentRoute  from './department.routes.js';
import staffRoutes from "./staff.routes.js";
import appointmentRoutes from "./appointment.routes.js";

const routes = express.Router();

routes.use('/auth', userRouter);
routes.use("/contact-us",contactRoute);
routes.use('/departments', departmentRoute);
routes.use('/staff', staffRoutes);
routes.use('/appointments', appointmentRoutes);

export default routes;