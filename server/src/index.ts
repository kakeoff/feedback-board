import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validation";

import * as UserController from "./controllers/UserController";
import * as PostController from "./controllers/PostController";

import checkAuth from "./utils/checkAuth";

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

const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file?.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
