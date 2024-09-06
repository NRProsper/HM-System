import express from "express";
import {createAppointment, getAllAppointments} from "../controllers/appointment.controller.js";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/", createAppointment);
appointmentRoutes.get("/", getAllAppointments);

export default appointmentRoutes;