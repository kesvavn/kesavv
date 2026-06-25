const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  title: String,
  location: String,
  rating: String,
  image: String,
  path: String,
});

module.exports = mongoose.model("Venue", venueSchema);