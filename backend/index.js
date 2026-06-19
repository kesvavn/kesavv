const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/k7/event")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.post("/venues", async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/venues", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});