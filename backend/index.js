const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const venueRoutes = require("./routes/venueRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/event")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/upload", uploadRoutes);
app.use("/api/venues", venueRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});