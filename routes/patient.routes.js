import express from "express";
import {
    createPatient,
    deletePatient,
    getAllPatients,
    getPatientById,
    updatePatient
} from "../controllers/patient.controller.js";
import {authorizedRoles, verifyToken} from "../middlewares/authorization.js";

const patientRoutes = express.Router();

patientRoutes.post('/', verifyToken, authorizedRoles("Admin", "Doctor", "Nurse", "Receptionist"), createPatient);
patientRoutes.get('/', verifyToken, authorizedRoles("Admin", "Doctor", "Nurse", "Receptionist"), getAllPatients);
patientRoutes.get('/:id', verifyToken, authorizedRoles("Admin", "Doctor", "Nurse", "Receptionist"), getPatientById);
patientRoutes.delete('/:id', verifyToken, authorizedRoles("Admin", "Doctor", "Nurse", "Receptionist"), deletePatient);
patientRoutes.put('/:id', verifyToken, authorizedRoles("Admin", "Doctor", "Nurse", "Receptionist"), updatePatient);


export default patientRoutes;