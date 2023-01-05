import express from "express";
import mongoose from "mongoose";
import { registerValidator } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/UserController.js";

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

app.post("/auth/register", registerValidator, register);
app.post("/auth/login", login);
app.get("/auth/me", checkAuth, getMe);
app.listen(4000, (error) => {
  error ? console.log(error) : console.log("Server listening 4000....");
});
