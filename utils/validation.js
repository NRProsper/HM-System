import { body } from 'express-validator'

export const validateLogin = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Invalid password").isStrongPassword()
];

export const signUpValidations = [

    body("username", "User name  is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const contactValidationRules = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('message').notEmpty().withMessage('Message is required')
];

export const departmentValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('contact').notEmpty().withMessage('Contact number is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('largeDescription').optional().isString().withMessage('Large description must be a string'),
    body('services').optional().isArray().withMessage('Services must be an array'),
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