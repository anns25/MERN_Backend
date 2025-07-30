import { check } from "express-validator";

export const updateProductValidationRules = [
    check('title')
    .optional()
    .notEmpty().withMessage("Title is required")
    .isLength({min:3}).withMessage("Title must have at least three characters."),
    check('price')
    .optional()
    .notEmpty().withMessage("Price is required.")
    .isNumeric().withMessage("Price must be a number"),
    check('category')
    .optional()
    .notEmpty().withMessage('Category is required'),
    check('image')
    .optional()
    .notEmpty().withMessage('Image URL is required')
    .isURL().withMessage('Must be a valid image URL'),
    check('description')
    .optional()
    .notEmpty().withMessage('Description is required')
    .isLength({min : 10}).withMessage('Must have at least 10 characters.')
];