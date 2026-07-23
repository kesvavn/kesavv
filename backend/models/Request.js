
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

  additionalPackage: {
  type: String,
  default: "No",
},

makeupLevel: String,
decorationLevel: String,
photographyPackage: String,
videoPackage: String,

foodCategory: String,
foodType: String,

stageSetup: String,
soundSystem: String,
ledScreen: String,

cakePackage: String,
birthdayDecoration: String,

privatePartyType: String,
musicEntertainment: String,

paymentMethod: String,
cancellationPolicy: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  fullName: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String
  },

  venueName: {
    type: String,
    required: true
  },
  
  image: {
  type: String
},

  functionDate: {
    type: String
  },

  guests: {
    type: Number
  },

  rooms: {
    type: Number
  },

  functionType: {
    type: String
  },

  functionTime: {
    type: String
  },

  totalPrice: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: "Pending"
  }


}, {
  timestamps: true
});


module.exports = mongoose.model("Request", requestSchema);