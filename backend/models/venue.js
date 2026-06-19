const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  rating: String,
  path: String,
});

module.exports = mongoose.model("Venue", VenueSchema);