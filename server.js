import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
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

app.post("/auth/register", registerValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({
    success: true,
  });
});
app.listen(4000, (error) => {
  error ? console.log(error) : console.log("Server listening 4000....");
});
