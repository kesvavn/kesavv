const express = require("express");
const router = express.Router();

const CancellationPolicy = require("../models/CancellationPolicy");

// Get All Policies
router.get("/", async (req, res) => {
  try {
    const policies = await CancellationPolicy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Policy
router.post("/", async (req, res) => {
  try {
    const policy = new CancellationPolicy(req.body);

    await policy.save();

    res.status(201).json(policy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Policy
router.put("/:id", async (req, res) => {
  try {
    const policy = await CancellationPolicy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(policy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Policy
router.delete("/:id", async (req, res) => {
  try {
    await CancellationPolicy.findByIdAndDelete(req.params.id);

    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;