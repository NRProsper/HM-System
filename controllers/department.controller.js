import departmentModel from '../models/department.model.js';
import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { validationResult } from "express-validator";

// Create a new department
export const createDepartment = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
    }

    const { name, description, contact, email, location, largeDescription, services, isActive } = req.body;

    // Check if the department already exists
    const existingDepartment = await departmentModel.findOne({ name });
    if (existingDepartment) {
        throw new BadRequestError('Department already exists');
    }

    // Create and save the new department
    const department = new departmentModel({
        name,
        description,
        contact,
        email,
        location,
        largeDescription,
        services,
        isActive
    });

    await department.save();
    res.status(201).json(department);
});

// Find a department by name
export const findDepartmentByName = asyncWrapper(async (req, res, next) => {
    const { name } = req.params;

    const department = await departmentModel.findOne({ name });
    if (!department) {
        return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(department);
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
export const deleteDepartment = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const deletedDepartment = await departmentModel.findByIdAndDelete(id);

    if (!deletedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
});
export const listDepartments = asyncWrapper(async (req, res, next) => {

    const department = await departmentModel.find({}, 'name');
    res.status(200).json({message:"A list of all department is retrieved successfully" ,department});
});
