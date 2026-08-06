const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getSettings,
  saveSettings,
} = require("../controllers/settingsController");

/* ==========================
   Multer Storage
========================== */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

/* ==========================
   Routes
========================== */

// Get Settings
router.get("/", getSettings);

// Save / Update Settings
router.post(
  "/",
  upload.single("logo"),
  saveSettings
);

module.exports = router;