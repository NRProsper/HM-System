import express from "express";
import {deleteStaff, getAllStaff, getStaffById} from "../controllers/staff.controller.js";
import {authorizedRoles, verifyToken} from "../middlewares/authorization.js";

const staffRoutes = express.Router();

staffRoutes.get("/all", getAllStaff);
staffRoutes.get("/single/:id", getStaffById);
staffRoutes.delete("/:id", verifyToken, authorizedRoles("Admin"), deleteStaff);



export default staffRoutes;