const mongoose = require("mongoose");


const pricingSchema = new mongoose.Schema({

category:{
    type:String,
    required:true
},

title:{
    type:String,
    required:true
},

amount:{
    type:Number,
    required:true
},

unit:{
    type:String,
    default:"Fixed"
},

description:{
    type:String,
    default:""
},

status:{
    type:Boolean,
    default:true
},

createdAt:{
    type:Date,
    default:Date.now
}


});


module.exports = mongoose.model("Pricing",pricingSchema);