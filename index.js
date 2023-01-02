import express from "express";
import jwt from "jsonwebtoken";

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
