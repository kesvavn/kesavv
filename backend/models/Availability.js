const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
{
    venueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue",
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        enum:[
            "Available",
            "Booked",
            "Blocked",
            "Holiday",
            "Maintenance"
        ],
        default:"Available"
    },

    reason:{
        type:String,
        default:""
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Availability",availabilitySchema);