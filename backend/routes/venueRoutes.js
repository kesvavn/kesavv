const express = require("express");
const router = express.Router();
const Venue = require("../models/Venue");

// GET ALL VENUES
router.get("/", async (req, res) => {
try {
const venues = await Venue.find();
res.json(venues);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

// GET SINGLE VENUE
router.get("/:id", async (req, res) => {
try {
const venue = await Venue.findById(req.params.id);


if (!venue) {
  return res.status(404).json({
    message: "Venue not found",
  });
}

res.json(venue);


} catch (error) {
res.status(500).json({ message: error.message });
}
});

// INSERT VENUE
router.post("/", async (req, res) => {
try {
const venue = new Venue(req.body);
await venue.save();


res.status(201).json(venue);


} catch (error) {
res.status(500).json({ message: error.message });
}
});

// UPDATE VENUE
router.put("/:id", async (req, res) => {
try {
const venue = await Venue.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);


res.json(venue);


} catch (error) {
res.status(500).json({ message: error.message });
}
});

// DELETE VENUE
router.delete("/:id", async (req, res) => {
try {
await Venue.findByIdAndDelete(req.params.id);

res.json({
  message: "Venue Deleted Successfully",
});


} catch (error) {
res.status(500).json({ message: error.message });
}
});

module.exports = router;
