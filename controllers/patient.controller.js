import asyncWrapper from "../middlewares/async.js";
import PatientModel from "../models/patient.model.js";

export const createPatient = asyncWrapper(async (req, res) => {
    const { firstName, lastName, email, phone, province, district, village, cell } = req.body;

    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient) {
        return res.status(400).json({ message: 'Patient with this email already exists.' });
    }

    const newPatient = new PatientModel({
        firstName,
        lastName,
        email,
        phone,
        province,
        district,
        village,
        cell,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
});

export const getAllPatients = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const patients = await PatientModel.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const totalPatients = await PatientModel.countDocuments();

    res.status(200).json({
        message: 'Patients retrieved successfully',
        total: totalPatients,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalPatients / limit),
        patients
    });
});

export const getPatientById = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const patient = await PatientModel.findById(id);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient retrieved successfully', patient });
});

export const updatePatient = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, province, district, village, cell } = req.body;

    const updatedPatient = await PatientModel.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        phone,
        province,
        district,
        village,
        cell,
    }, { new: true, runValidators: true });

    if (!updatedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
});



export const deletePatient = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const deletedPatient = await PatientModel.findByIdAndDelete(id);
    if (!deletedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
});