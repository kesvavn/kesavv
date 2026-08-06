const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    adminName: {
      type: String,
      default: "",
    },

    adminEmail: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      default: "",
    },

    currency: {
      type: String,
      default: "INR",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    gst: {
      type: Number,
      default: 18,
    },

    emailNotification: {
      type: Boolean,
      default: true,
    },

    whatsappNotification: {
      type: Boolean,
      default: true,
    },

    bookingNotification: {
      type: Boolean,
      default: true,
    },

    twoFactor: {
      type: Boolean,
      default: false,
    },

    loginAlert: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);