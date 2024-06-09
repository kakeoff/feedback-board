import cors from "cors";
import crypto from "crypto";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validation";

import { PostController, UserController } from "./controllers/index";

import checkAuth from "./utils/checkAuth";
import handleValidationErrors from "./utils/handleValidationErrors";

mongoose
  .connect(
    "mongodb+srv://admin:admin@mern-posts-db.rvisudm.mongodb.net/?retryWrites=true&w=majority&appName=mern-posts-db"
  )
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("Database connection error =>", err);
  });

const port = 3001;
const app = express();

const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_, file, cb) => {
    const key = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    const fileName = `${key}${ext}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.patch("/user/me", checkAuth, UserController.updateMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file?.filename}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.get("/tags", PostController.getLastTags);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
