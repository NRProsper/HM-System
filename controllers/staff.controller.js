import asyncWrapper from "../middlewares/async.js";
import UserModel from "../models/user.model.js";
import AppointmentModel from "../models/appointment.model.js";

export const getAllStaff = asyncWrapper(async (req, res, next) => {
    const {page = 1, limit = 10, role, department} = req.query;

    const filter = {};
    if (role) {
        filter.role = role;
    }
    if (department) {
        filter.department = department;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const staff = await UserModel.find(filter)
        .populate('department')
        .select('-password')
        .skip(skip)
        .limit(limitNumber)
        .lean();
    

    const totalStaff = await UserModel.countDocuments(filter);

    res.status(200).json({
        message: "Staff members retrieved successfully",
        total: totalStaff,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalStaff / limitNumber),
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

export const deleteStaff = asyncWrapper(async (req, res, next) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Staff ID is required."
        });
    }

    const staff = await UserModel.findByIdAndDelete(id)
        .populate('department')
        .select('-password');

    if (!staff) {
        return res.status(404).json({
            message: "Staff member not found."
        });
    }

    res.status(204).json({message: "User deleted successfully"});
})