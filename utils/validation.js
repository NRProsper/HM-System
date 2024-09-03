import { body, validationResult } from 'express-validator'

export const logInValidations = [
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