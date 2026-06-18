const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/event")
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "123456"
  ) {
    res.json({
      success: true,
      message: "Login Success",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});