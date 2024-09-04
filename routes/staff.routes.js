import express from "express";
import {getAllStaff, getStaffById} from "../controllers/staff.controller.js";

const staffRoutes = express.Router();

staffRoutes.get("/all", getAllStaff);
staffRoutes.get("/single/:id", getStaffById);



export default staffRoutes;