const mongoose = require("mongoose");


const requestSchema = new mongoose.Schema({

fullName:{
 type:String,
 required:true
},

phone:{
 type:String,
 required:true
},

email:{
 type:String
},


venueName:{
 type:String,
 required:true
},


functionDate:{
 type:String
},


guests:{
 type:Number
},


rooms:{
 type:Number
},


functionType:{
 type:String
},


functionTime:{
 type:String
},


totalPrice:{
 type:Number,
 default:0
},


status:{
 type:String,
 default:"Pending"
}


},{
timestamps:true
});


module.exports = mongoose.model(
"Request",
requestSchema
);