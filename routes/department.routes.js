import express from "express";
import {
    createDepartment,
    getAllDepartments
} from "../controllers/department.controller.js";

const departmentRoute = express.Router();

departmentRoute.get("/", getAllDepartments);
departmentRoute.post("/", createDepartment);

export default departmentRoute;
