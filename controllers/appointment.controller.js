import asyncWrapper from "../middlewares/async.js";
import AppointmentModel from "../models/appointment.model.js";
import {validateAppointment} from "../utils/validation.js";
import {validateRequest} from "../middlewares/validate.js";

export const createAppointment = asyncWrapper([
    validateAppointment,
    validateRequest,
    async (req, res) => {
        const newAppointment = new AppointmentModel({
            patientName: req.body.patientName,
            departmentId: req.body.departmentId,
            doctorId: req.body.doctorId,
            visitDate: req.body.visitDate,
            email: req.body.email,
            phone: req.body.phone,
            time: req.body.time,
            comments: req.body.comments,
        })

        const createdAppointment = await newAppointment.save();
        res.status(201).json({
            message: "Appointment created successfully",
            appointment: (await createdAppointment.populate("departmentId")).populate("doctorId")
        })
    }
])


export const getAllAppointments = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10, sort = '-visitDate', status } = req.query;

    const filter = {}
    if (status) {
        filter.status = status;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Skip the previous pages and limit the number of documents returned
    const skip = (pageNumber - 1) * limitNumber;

    const appointments = await AppointmentModel.find(filter)
        .populate('departmentId')
        .populate('doctorId')
        .sort(sort)              // Sort by query parameter, e.g., '-visitDate' for descending
        .skip(skip)              // Skip the previous pages
        .limit(limitNumber);     // Limit results per page

    const totalAppointments = AppointmentModel.countDocuments();

    res.status(200).json({
        message: "Appointments fetched successfully",
        total: totalAppointments,                // Total count of documents
        page: pageNumber,                        // Current page
        limit: limitNumber,                      // Limit per page
        totalPages: Math.ceil(totalAppointments / limitNumber), // Total pages
        appointments                            // List of appointments
    });

})