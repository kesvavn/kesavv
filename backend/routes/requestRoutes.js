const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// CREATE REQUEST
router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);

    await request.save();

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

// GET BOOKED DATES
router.get("/booked-dates", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Confirmed",
    });

    const bookedDates = requests.map((item) => item.functionDate);

    res.json(bookedDates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL REQUESTS
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE STATUS
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