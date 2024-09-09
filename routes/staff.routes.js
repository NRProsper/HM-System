import express from "express";
import {deleteStaff, getAllStaff, getStaffById} from "../controllers/staff.controller.js";

const staffRoutes = express.Router();

staffRoutes.get("/all", getAllStaff);
staffRoutes.get("/single/:id", getStaffById);
staffRoutes.delete("/:id", deleteStaff);



export default staffRoutes;