import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { userMapper } from "../mappers/user.mapper";
import UserModel from "../models/User";
import {
  AuthRequest,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
} from "../types/authTypes";

export const register = async (req: RegisterRequest, res: Response) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(403).json({ message: "User is already exists" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );
    const userData = {
      user: userMapper(user),
      token: token,
    };
    res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: LoginRequest, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      return res.status(403).json({ message: "Invalid login or password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const userData = {
      user: userMapper(user),
      token: token,
    };
    res.json(userData);
  } catch (err) {
    return res.status(500).json({ message: "Authorization failed" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = userMapper(user);
    res.json(userData);
  } catch (err) {
    return res.status(500).json({ message: "Access denied" });
  }
};

export const updateMe = async (req: UpdateUserRequest, res: Response) => {
  try {
    const userDataToUpdate = {
      email: req.body.email || undefined,
      fullName: req.body.fullName || undefined,
      avatarUrl: req.body.avatarUrl || undefined,
    };
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      userDataToUpdate,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userDataToResponse = userMapper(updatedUser);
    res.json(userDataToResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
};
