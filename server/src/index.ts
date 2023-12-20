import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth";
import { validationResult } from "express-validator";
import UserModel from "./models/User";
import bcrypt from "bcrypt";
import { AuthDto, RegisterDto } from "./types/authTypes";
mongoose
  .connect(
    "mongodb+srv://admin:admin@mern-posts-db.rvisudm.mongodb.net/mern-posts?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("Database connection error =>", err);
  });

const port = 3001;
const app = express();

app.use(express.json());
// TODO: types for req.body
app.post("/auth/login", async (req: Request<{}, {}, AuthDto>, res) => {
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
      return res.status(404).json({ message: "Invalid login or password" });
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
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: token,
    };
    res.json(userData);
  } catch (err) {
    return res.status(500).json({ message: "Authorization failed" });
  }
});

// TODO: types for req.body
app.post(
  "/auth/register",
  registerValidation,
  async (req: Request<{}, {}, RegisterDto>, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
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
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: token,
      };
      res.json(userData);
    } catch (err) {
      return res.status(500).json({ message: "Registration failed" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
