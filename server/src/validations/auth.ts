import { body } from "express-validator";

export const registerValidation = [
  body("email", 'Invalid email format').isEmail(),
  body("password", 'Password must be longer 6 symbols').isLength({ min: 6 }),
  body("fullName", 'Full name must be longer 3 symbols').isLength({ min: 3 }),
  body("avatarUrl", 'Invalid avatar link').optional().isURL(),
];
