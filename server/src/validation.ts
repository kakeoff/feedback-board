import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be longer 6 symbols").isLength({ min: 6 }),
  body("fullName", "Full name must be longer 3 symbols").isLength({ min: 3 }),
];

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be longer 6 symbols").isLength({ min: 6 }),
];

export const postCreateValidation = [
  body("title", "Title must be longer 3 symbols").isLength({ min: 3 }),
  body("text", "Password must be longer 10 symbols").isLength({ min: 10 }),
  body("tags", "Invalid tags format").optional().isString(),
  body("imageUrl", "Invalid image link").optional().isString(),
];

export const updateMeValidation = [
  body("email", "Invalid email format").optional().isEmail(),
  body("avatarUrl", "Invalid avatar link").optional(),
  body("fullName", "Invalid fullName format").optional().isString(),
];
