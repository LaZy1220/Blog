import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";
import { registerValidator } from "./validations/auth.js";

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/Blog")
  .then(() => console.log("DB OK!!!"))
  .catch((err) => console.log(`DB connection error: ${err}`));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/auth/register", registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    passwordHash,
    avatarUrl: req.body.avatarUrl,
  });
  const user = await doc.save();

  res.json(user);
});
app.listen(4000, (error) => {
  error ? console.log(error) : console.log("Server listening 4000....");
});
