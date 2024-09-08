import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const groupedErrors = errors.array().reduce((acc, err) => {
            if (!acc[err.path]) {
                acc[err.path] = [];
            }
            acc[err.path].push({
                msg: err.msg,
                type: err.type,
                location: err.location
            });
            return acc;
        }, {});

        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: groupedErrors
        });
    }
    next();
};