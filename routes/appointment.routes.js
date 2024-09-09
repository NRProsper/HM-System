import express from "express";
import {
    approveAppointment,
    createAppointment,
    getAllAppointments,
    rejectAppointment
} from "../controllers/appointment.controller.js";
import {authorizedRoles, verifyToken} from "../middlewares/authorization.js";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/", createAppointment);
appointmentRoutes.get("/",verifyToken, authorizedRoles("Admin", "Doctor"), getAllAppointments);
appointmentRoutes.post('/:appointmentId/approve',verifyToken, authorizedRoles("Doctor", "Admin"), approveAppointment);
appointmentRoutes.post('/:appointmentId/reject',verifyToken, authorizedRoles("Doctor", "Admin"), rejectAppointment);

export default appointmentRoutes;