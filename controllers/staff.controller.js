import asyncWrapper from "../middlewares/async.js";
import UserModel from "../models/user.model.js";

export const getAllStaff = asyncWrapper(async (req, res, next) => {
    const {role, department} = req.query;

    const filter = {};
    if (role) {
        filter.role = role;
    }
    if (department) {
        filter.department = department;
    }

    const staff = await UserModel.find(filter)
        .populate('department')
        .select('-password'); // Exclude the password field

    if (staff.length === 0) {
        return res.status(404).json({
            message: "No staff members found for the provided filters."
        });
    }

    res.status(200).json({
        message: "Staff members retrieved successfully",
        staff
    });


    }
)


export const getStaffById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Staff ID is required."
        });
    }

    const staff = await UserModel.findById(id)
        .populate('department')
        .select('-password');

    if (!staff) {
        return res.status(404).json({
            message: "Staff member not found."
        });
    }

    res.status(200).json({
        message: "Staff member retrieved successfully",
        staff
    });
});