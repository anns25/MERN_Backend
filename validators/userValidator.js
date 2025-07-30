import { check } from "express-validator";

export const userValidationRules =[
    check('username')
    .notEmpty().withMessage('Username is required')
    .isLength({min : 3}).withMessage('Must be at least 3 characters'),
    check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min : 4}).withMessage('Must be at least 4 characters')
];