import asyncWrapper from "../middlewares/async.js";
import AppointmentModel from "../models/appointment.model.js";
import {validateAppointment} from "../utils/validation.js";
import {validateRequest} from "../middlewares/validate.js";
import {sendEmail} from "../utils/sendEmail.js";
import UserModel from "../models/user.model.js";
import DepartmentModel from "../models/department.model.js";

export const createAppointment = [
    validateAppointment,
    validateRequest,
    asyncWrapper(async (req, res) => {
        const { patientName, department, doctor, visitDate, email, phone, time, comment } = req.body;

        const newAppointment = new AppointmentModel({
            patientName,
            department,
            doctor,
            visitDate,
            email,
            phone,
            time,
            comment
        });

        const createdAppointment = await newAppointment.save();

        const rDoctor = await UserModel.findById(doctor);
        const rDepartment = await DepartmentModel.findById(department);

        const htmlContent = `
          <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px;">
                    <h1 style="font-size: 24px; color: #333333; margin-top: 0;">Dear ${patientName},</h1>
                    <p style="font-size: 16px; color: #666666;">Your appointment has been booked successfully.</p>
                    <p style="font-size: 16px; color: #666666;">We will notify you once your appointment is approved.</p>
                    <p style="font-size: 16px; color: #666666;">Appointment Details:</p>
                    <ul style="font-size: 16px; color: #333333;">
                      <li><strong>Department:</strong> ${rDepartment.name}</li>
                      <li><strong>Doctor:</strong> ${rDoctor.firstName + " " + rDoctor.lastName}</li>
                      <li><strong>Date:</strong> ${visitDate}</li>
                      <li><strong>Time:</strong> ${time}</li>
                      <li><strong>Comments:</strong> ${comment}</li>
                    </ul>
                    <p style="font-size: 16px; color: #666666; margin-bottom: 0;">Best regards,<br>Care Sync</p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `;

        sendEmail(email, "Appointment Booked", htmlContent);


        res.status(201).json({
            message: "Appointment created successfully",
            appointment: createdAppointment
        });
    })
];


export const getAllAppointments = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10, sort = '-visitDate', status } = req.query;
    const userRole = req.user.role;
    const userId = req.user.id;

    const filter = {}
    if (status) {
        filter.status = status;
    }

    if (userRole === 'Doctor') {
        filter.doctor = userId;
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

export const approveAppointment = asyncWrapper(async (req, res) => {
    const { appointmentId } = req.params;
    const { comment } = req.body;
    const updatedAppointment = await AppointmentModel.approveAppointment(appointmentId);
    const appointment = await AppointmentModel.findById(appointmentId).populate("department").populate("doctor")

    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 20px;">
                <h1 style="font-size: 24px; color: #333333; margin-top: 0;">Dear ${updatedAppointment.patientName},</h1>
                <p style="font-size: 16px; color: #666666;">Your appointment has been <strong>approved</strong>.</p>
                <p style="font-size: 16px; color: #666666;">Appointment Details:</p>
                <ul style="font-size: 16px; color: #333333;">
                  <li><strong>Department:</strong> ${updatedAppointment.department.name}</li>
                  <li><strong>Doctor:</strong> ${appointment.doctor.firstName} ${appointment.doctor.lastName}</li>
                  <li><strong>Date:</strong> ${updatedAppointment.visitDate}</li>
                  <li><strong>Time:</strong> ${updatedAppointment.time}</li>
                  <li><strong>Comments from Doctor:</strong> ${comment ? comment : "No comments provided by the Doctor"}</li>
                </ul>
                <p style="font-size: 16px; color: #666666; margin-bottom: 0;">Best regards,<br>Care Sync Team</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    sendEmail(updatedAppointment.email, "Appointment Accepted",htmlContent)

    res.status(200).json({
        message: 'Appointment approved',
        appointment: updatedAppointment
    });

    }
)

export const rejectAppointment = asyncWrapper(async (req, res) => {
    const { appointmentId } = req.params;
    const { comment } = req.body;

    const updatedAppointment = await AppointmentModel.rejectAppointment(appointmentId);
    if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }


    const appointment = await AppointmentModel.findById(appointmentId)
        .populate("department")
        .populate("doctor");

    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 20px;">
                <h1 style="font-size: 24px; color: #333333; margin-top: 0;">Dear ${updatedAppointment.patientName},</h1>
                <p style="font-size: 16px; color: #666666;">Your appointment has been <strong>rejected</strong>.</p>
                <p style="font-size: 16px; color: #666666;">Appointment Details:</p>
                <ul style="font-size: 16px; color: #333333;">
                  <li><strong>Department:</strong> ${appointment.department.name}</li>
                  <li><strong>Doctor:</strong> ${appointment.doctor.firstName} ${appointment.doctor.lastName}</li>
                  <li><strong>Date:</strong> ${updatedAppointment.visitDate}</li>
                  <li><strong>Time:</strong> ${updatedAppointment.time}</li>
                  <li><strong>Comments from Doctor:</strong> ${comment ? comment : "No comments provided by the Doctor"}</li>
                </ul>
                <p style="font-size: 16px; color: #666666; margin-bottom: 0;">Best regards,<br>Care Sync Team</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send the rejection email
    sendEmail(updatedAppointment.email, "Appointment Rejected", htmlContent);

    res.status(200).json({
        message: 'Appointment rejected',
        appointment: updatedAppointment
    });
});