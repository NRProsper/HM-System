import { body } from 'express-validator'

export const validateLogin = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
];


export const validateUser = [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string'),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string'),

    body('email')
        .notEmpty().withMessage('Email must be provided')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),

    body('phone')
        .notEmpty().withMessage('Phone number must be provided')
        .isMobilePhone().withMessage('Phone number must be valid'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('role')
        .optional()
        .isIn(['Admin', 'Doctor', 'Nurse', 'Receptionist']).withMessage('Role must be one of Admin, Doctor, Nurse, or Receptionist'),

    body('department')
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Department must be a valid MongoDB ObjectId'),
];

export const contactValidationRules = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('message').notEmpty().withMessage('Message is required')
];

export const validateDepartment = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('contact').notEmpty().withMessage('Contact number is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('largeDescription').optional().isString().withMessage('Large description must be a string'),
    body('services').notEmpty().isArray().withMessage('Services must be an array'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

export const validateAppointment = [
    body('patientName')
        .notEmpty().withMessage('Patient name is required')
        .isString().withMessage('Patient name must be a string'),

    body('department')
        .notEmpty().withMessage('Department ID is required')
        .isMongoId().withMessage('Department ID must be a valid Mongo ID'),

    body('doctor')
        .notEmpty().withMessage('Doctor ID is required')
        .isMongoId().withMessage('Doctor ID must be a valid Mongo ID'),

    body('visitDate')
        .notEmpty().withMessage('Visit date is required')
        .isISO8601().withMessage('Visit date must be a valid date (ISO8601 format)'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address'),

    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Please enter a valid phone number'),

    body('time')
        .notEmpty().withMessage('Time is required')
        .matches(/^\d{2}:\d{2}$/).withMessage('Time must be in HH:mm format'),

    body('comments')
        .optional()
        .isString().withMessage('Comments must be a string')
];