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

    // ===============================
    // Logo uploaded
    // ===============================
    if (req.file) {
      req.body.logo = req.file.filename;
    }

    // ===============================
    // CREATE
    // ===============================
    if (!settings) {

      settings = await Settings.create(req.body);

    }

    // ===============================
    // UPDATE
    // ===============================
    else {

      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    }

    // ===============================
    // RESPONSE
    // ===============================
    res.status(200).json({
      success: true,
      message: "Settings Updated Successfully",
      settings,
    });

  } catch (err) {

    console.error("Settings Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};