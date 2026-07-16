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
    type:String,
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


// Additional Package

additionalPackage:{
    type:String,
    default:"No"
},


// Wedding

makeupLevel:String,

decorationLevel:String,

photographyPackage:String,

videoPackage:String,



// Corporate

stageSetup:String,

soundSystem:String,

ledScreen:String,



// Birthday

cakePackage:String,

birthdayDecoration:String,


privatePartyType:String,

musicEntertainment:String,


// Payment

paymentMethod:String,

cancellationPolicy:String,


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