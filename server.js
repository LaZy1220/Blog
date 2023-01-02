import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/testDb")
  .then(() => console.log("DB OK!!!"))
  .catch((err) => console.log(`DB connection error: ${err}`));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/auth", (req, res) => {
  console.log(req.body);
  const token = jwt.sign(
    {
      email: req.body.email,
      fullname: req.body.name,
      pass: req.body.pass,
    },
    "secret123"
  );
  res.json({
    succsess: true,
    token,
  });
});
app.listen(4000, (error) => {
  error ? console.log(error) : console.log("Server listening 4000....");
});
