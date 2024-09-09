import express from "express";
import {
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment
} from "../controllers/department.controller.js";
import {authorizedRoles, verifyToken} from "../middlewares/authorization.js";

const departmentRoute = express.Router();

departmentRoute.get("/", getAllDepartments);
departmentRoute.get("/:id", getDepartmentById);
departmentRoute.post("/",verifyToken, authorizedRoles("Admin"), createDepartment);
departmentRoute.put("/:id", verifyToken, authorizedRoles("Admin"), updateDepartment);
departmentRoute.delete("/:id", verifyToken, authorizedRoles("Admin"), deleteDepartment);

export default departmentRoute;
