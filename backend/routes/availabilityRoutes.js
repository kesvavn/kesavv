const express = require("express");
const router = express.Router();

const {
  getAvailability,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getUnavailableDates
} = require("../controllers/availabilityController");

router.get("/", getAvailability);
router.get("/unavailable", getUnavailableDates);

router.post("/", addAvailability);
router.put("/:id", updateAvailability);
router.delete("/:id", deleteAvailability);

module.exports = router;