const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    text:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        default:5
    },

    time:{
        type:String,
        default:"Recently"
    },

    status:{
        type:String,
        default:"Approved"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("Review", reviewSchema);