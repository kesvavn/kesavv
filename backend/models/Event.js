/*
const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema(
{

eventName:{
 type:String,
 required:true,
 trim:true
},


category:{
 type:String,
 required:true,
 enum:[
  "Wedding",
  "Reception",
  "Corporate Event",
  "Private Party"
 ]
},


description:{
 type:String,
 default:""
},


image:{
 type:String,
 default:""
},


startingPrice:{
 type:Number,
 required:true
},


maxGuests:{
 type:Number,
 required:true
},


duration:{
 type:String,
 required:true
},


location:{
 type:String,
 default:""
},


status:{
 type:String,
 enum:[
  "Active",
  "Inactive"
 ],
 default:"Active"
}


},
{
 timestamps:true
}
);


module.exports = mongoose.model(
"Event",
eventSchema
);
*/