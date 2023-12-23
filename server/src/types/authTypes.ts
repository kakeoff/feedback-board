import jwt from "jsonwebtoken";
import { Request } from "express";

export interface AuthDto {
  email: string;
  password: string;
}

export interface RegisterDto extends AuthDto {
  fullName: string;
  avatarUrl: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export interface DecodedToken extends jwt.JwtPayload {
  _id?: string;
}
