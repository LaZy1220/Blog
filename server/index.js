import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  loginValidator,
  postCreateValidator,
  registerValidator,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/UserController.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/PostController.js";
import handleValidationError from "./utils/handleValidationError.js";

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/Blog")
  .then(() => console.log("DB OK!!!"))
  .catch((err) => console.log(`DB connection error: ${err}`));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/auth/register", registerValidator, handleValidationError, register);
app.post("/auth/login", loginValidator, handleValidationError, login);
app.get("/auth/me", checkAuth, getMe);

app.post(
  "/posts",
  checkAuth,
  postCreateValidator,
  handleValidationError,
  create
);
app.post(`/upload`, checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get("posts", getAll);
app.get("post/:id", getOne);
app.delete("post/:id", checkAuth, remove);
app.patch(
  "/post/:id",
  checkAuth,
  postCreateValidator,
  handleValidationError,
  update
);
app.listen(4000, (error) => {
  error ? console.log(error) : console.log("Server listening 4000....");
});
