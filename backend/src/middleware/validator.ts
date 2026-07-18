// server/src/middleware/validator.ts
import { body, param, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

// Middleware to catch validator errors (Reused across all validation chains)
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// 1. Existing Body validator (POST / PUT)
export const validateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be under 100 characters'),
  body('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'DONE'])
    .withMessage('Invalid status value'),
  body('priority')
    .optional()
    .isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
    .withMessage('Invalid priority value'),
  body('dueDate')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('dueDate must be a valid ISO8601 date'),
  handleValidationErrors
];

// 2. ⚡ NEW Param validator (GET / PUT / DELETE by ID)
export const validateId = [
  param('id')
    .trim()
    .isUUID() // Checks if the parameter is a valid UUID string
    .withMessage('The provided task ID must be a valid UUID'),
  handleValidationErrors
];