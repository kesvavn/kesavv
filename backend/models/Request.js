const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

additionalPackage:{
 type:String,
 default:"No"
},

makeupLevel:String,
decorationLevel:String,
photographyPackage:String,
videoPackage:String,

foodCategory:String,
foodType:String,

stageSetup:String,
soundSystem:String,
ledScreen:String,

cakePackage:String,
birthdayDecoration:String,

privatePartyType:String,
musicEntertainment:String,


userId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:true
},


fullName:{
 type:String,
 required:true
},

phone:{
 type:String,
 required:true
},

email:String,


venueName:{
 type:String,
 required:true
},


image:String,


functionDate:String,

guests:Number,

rooms:Number,

functionType:String,

functionTime:String,


cancellationPolicy:{
 type:String,
 default:""
},


note:{
 type:String,
 default:""
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