const Settings = require("../models/Settings");

/* ===============================
   GET SETTINGS
================================= */
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===============================
   CREATE / UPDATE SETTINGS
================================= */
exports.saveSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // If logo uploaded
    if (req.file) {
      req.body.logo = req.file.filename;
    }

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Settings Updated Successfully",
      settings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};