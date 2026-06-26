const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: String,
      default: "★★★★★",
    },

    image: {
      type: String,
      required: true,
    },

    isTop: {
      type: Boolean,
      default: false,   // 👈 for homepage top venues
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);