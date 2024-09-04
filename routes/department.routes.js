import express from "express";
import {
    createDepartment, deleteDepartment,
    getAllDepartments, getDepartmentById, updateDepartment
} from "../controllers/department.controller.js";

const departmentRoute = express.Router();

departmentRoute.get("/", getAllDepartments);
departmentRoute.get("/:id", getDepartmentById);
departmentRoute.post("/", createDepartment);
departmentRoute.put("/:id", updateDepartment);
departmentRoute.delete("/:id", deleteDepartment);

export default departmentRoute;
