import departmentModel from '../models/department.model.js';
import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { validationResult } from "express-validator";
import DepartmentModel from "../models/department.model.js";
import {NotFoundError} from "../errors/index.js";

export const getAllDepartments = asyncWrapper(
    async (req, res) => {
        const departments = await DepartmentModel.find();
        return res.status(200).json(
            {
                departments: departments,
                message: "Departments retrieved successfully"
            }
        );
    }
)

export const getDepartmentById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    // Find the department by its ID
    const department = await DepartmentModel.findById(id);

    // If the department doesn't exist, throw a NotFoundError
    if (!department) {
        throw new NotFoundError(`Department with ID ${id} not found`);
    }

    // Return the department data
    res.status(200).json(department);
});

// Create a new department
export const createDepartment = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
    }

    const { name, description, contact, email, location, largeDescription, services } = req.body;

    // Check if the department already exists
    const existingDepartment = await departmentModel.findOne({ name });
    if (existingDepartment) {
        throw new BadRequestError('Department already exists');
    }

    // Create and save the new department
    const department = new DepartmentModel({
        name,
        description,
        contact,
        email,
        location,
        largeDescription,
        services
    });

    await department.save();
    res.status(201).json(department);
});


// Update a department
export const updateDepartment = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
    }

    const { id } = req.params;
    const { name, description, contact, email, location, largeDescription, services, isActive } = req.body;

    // Find the department by id and update it
    const updatedDepartment = await departmentModel.findByIdAndUpdate(
        id,
        {
            name,
            description,
            contact,
            email,
            location,
            largeDescription,
            services,
            isActive
        },
        { new: true } // Return the updated document
    );

    if (!updatedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(updatedDepartment);
});

// Delete a department
export const deleteDepartment = asyncWrapper(async (req, res) => {
    const {id} = req.params;
    const department = await DepartmentModel.findByIdAndDelete(id);
    if(!department) {
        return res.status(404).json({message: `No such department with id: ${id}`})
    }
    res.status(210).json({message: "department deleted successfully"})
});
