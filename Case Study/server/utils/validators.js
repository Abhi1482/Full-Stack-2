import { body, param } from 'express-validator';

// User Registration Validation
export const validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number'),
];

// User Login Validation
export const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required'),
];

// Component Creation Validation
export const validateComponent = [
    body('type')
        .notEmpty().withMessage('Component type is required')
        .isIn(['course', 'part', 'subject', 'notes', 'assignment', 'test', 'ai'])
        .withMessage('Invalid component type'),

    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),

    body('parentId')
        .optional({ nullable: true })
        .isMongoId().withMessage('Invalid parent ID'),

    body('position')
        .optional()
        .isObject().withMessage('Position must be an object'),

    body('position.x')
        .optional()
        .isNumeric().withMessage('Position X must be a number'),

    body('position.y')
        .optional()
        .isNumeric().withMessage('Position Y must be a number'),
];

// Component Update Validation
export const validateComponentUpdate = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),

    body('metadata')
        .optional()
        .isObject().withMessage('Metadata must be an object'),

    body('position')
        .optional()
        .isObject().withMessage('Position must be an object'),
];

// MongoDB ID Validation
export const validateMongoId = [
    param('id')
        .isMongoId().withMessage('Invalid ID format'),
];

export const validateComponentId = [
    param('componentId')
        .isMongoId().withMessage('Invalid component ID format'),
];

export const validateFileId = [
    param('fileId')
        .isMongoId().withMessage('Invalid file ID format'),
];
