import express from "express";
import { createDepartment,findDepartmentByName, updateDepartment,deleteDepartment, listDepartments } from "../controllers/department.controller.js";
import { departmentValidationRules } from '../utils/validation.js';

export const  departmentRoute = express.Router();

departmentRoute.post('/add', departmentValidationRules, createDepartment);
departmentRoute.get('/getByName/:name', findDepartmentByName);
departmentRoute.put('/update/:id', departmentValidationRules, updateDepartment);
departmentRoute.delete('/delete/:id', deleteDepartment);
departmentRoute.get('/NameOfAllDepartment', listDepartments);