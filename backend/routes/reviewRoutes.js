const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

// ===============================
// Get Approved Reviews (Website)
// ===============================
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({
      status: "Approved",
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// Get All Reviews (Admin)
// ===============================
router.get("/admin", async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// Add Review
// ===============================
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// Approve / Reject Review
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// Delete Review
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;