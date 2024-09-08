import asyncWrapper from "../middlewares/async.js";
import AppointmentModel from "../models/appointment.model.js";
import {validateAppointment} from "../utils/validation.js";
import {validateRequest} from "../middlewares/validate.js";

export const createAppointment = [
    validateAppointment,
    validateRequest,
    asyncWrapper(async (req, res) => {
        const newAppointment = new AppointmentModel({
            patientName: req.body.patientName,
            department: req.body.department,
            doctor: req.body.doctor,
            visitDate: req.body.visitDate,
            email: req.body.email,
            phone: req.body.phone,
            time: req.body.time,
            comments: req.body.comments,
        });

        const createdAppointment = await newAppointment.save();
        res.status(201).json({
            message: "Appointment created successfully",
            appointment: (await createdAppointment.populate("department")).populate("doctor")
        });
    })
];


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
        .populate('department')
        .populate({
            path: 'doctor',
            select: '-password'
        })
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .lean();

    const totalAppointments = await AppointmentModel.countDocuments(filter);

    res.status(200).send({
        message: "Appointments fetched successfully",
        total: totalAppointments,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalAppointments / limitNumber),
        appointments
    });

})