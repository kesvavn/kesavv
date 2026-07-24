const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const auth = require("../middleware/auth");

// ===========================
// CREATE REQUEST
// ===========================
router.post("/", auth, async (req, res) => {
  try {
        console.log("Incoming Request Body:", req.body); // 👈 Indha line add pannunga

    const request = new Request({
      ...req.body,
      userId: req.user.id, // or req.user._id (depends on auth middleware)
    });

    await request.save();
 console.log("Saved Request:", request); 
 
    res.status(201).json({
      message: "Request Submitted Successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===========================
// BOOKED DATES
// ===========================
router.get("/booked-dates", async (req, res) => {
  try {
    const { venueName } = req.query;

    const bookings = await Request.find({
      venueName,
      status: "Confirmed",
    });

    const bookedDates = bookings.map((b) => b.functionDate);

    res.json(bookedDates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===========================
// MY BOOKINGS (USER)
// ===========================
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Request.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
// ===========================
// GET ALL REQUESTS (ADMIN)
// ===========================
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({
      createdAt: -1,
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===========================
// UPDATE STATUS
// ===========================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;