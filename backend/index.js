require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const venueRoutes = require("./routes/venueRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const contactRoutes = require("./routes/ContactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/event")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Existing Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/contact", contactRoutes); 
app.use("/api", authRoutes);
// JWT Routes
app.use("/", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Protected Route
app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Welcome",
    user: req.user,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});