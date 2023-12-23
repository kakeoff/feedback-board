import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth";
import * as UserController from "./controllers/UserController";

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

app.use(express.json());

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
