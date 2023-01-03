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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    //hashpass
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //creatuser
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });
    const user = await doc.save();
    //create token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );
    //response user(not pass) and token
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
    });
  }
});
app.listen(4000, (error) => {
  error ? console.log(error) : console.log("Server listening 4000....");
});
