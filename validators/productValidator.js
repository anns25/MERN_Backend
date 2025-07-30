import { check } from "express-validator";

export const productValidationRules = [
    check('title')
    .notEmpty().withMessage("Title is required")
    .isLength({min:3}).withMessage("Title must have at least three characters."),
    check('price')
    .notEmpty().withMessage("Price is required.")
    .isNumeric().withMessage("Price must be a number"),
    check('category')
    .notEmpty().withMessage('Category is required'),
    check('image')
    .notEmpty().withMessage('Image URL is required')
    .isURL().withMessage('Must be a valid image URL'),
    check('description')
    .notEmpty().withMessage('Description is required')
    .isLength({min : 10}).withMessage('Must have at least 10 characters.')
];