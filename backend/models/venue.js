const mongoose = require("mongoose");


const venueSchema = new mongoose.Schema(
{

// BASIC INFORMATION

title:{
    type:String,
    required:true,
    trim:true
},


slug:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
},


location:{
    type:String,
    required:true,
    trim:true
},


type:{
    type:String,
    required:true,
    trim:true
},


category:{
    type:String,
    default:"Wedding Venue"
},


rating:{
type:Number,
default:5
},

image:{
    type:String,
    required:true
},




// ABOUT VENUE

description:{
    type:String,
    default:""
},





// FACILITIES


capacity:{
    type:String,
    default:""
},


indoorSpace:{
    type:String,
    default:""
},


outdoorSpace:{
    type:String,
    default:""
},


parkingCapacity:{
    type:String,
    default:""
},


acRooms:{
    type:String,
    default:""
},


nonAcRooms:{
    type:String,
    default:""
},





// AMENITIES


wifi:{
    type:Boolean,
    default:false
},


security:{
    type:Boolean,
    default:false
},


powerBackup:{
    type:Boolean,
    default:false
},


cctv:{
    type:Boolean,
    default:false
},


catering:{
    type:Boolean,
    default:false
},


customPackage:{
    type:Boolean,
    default:false
},


//Nearby Attractions
airportDistance: {
  type: String,
  default: "",
},

railwayDistance: {
  type: String,
  default: "",
},

busStandDistance: {
  type: String,
  default: "",
},

beachDistance: {
  type: String,
  default: "",
},

hotelDistance: {
  type: String,
  default: "",
},

hospitalDistance: {
  type: String,
  default: "",
},



// GALLERY


gallery:[
{
    url:{
        type:String,
        required:true
    },

    alt:{
        type:String,
        default:"Venue Image"
    }
}
],





// GOOGLE MAP


map:{
    type:String,
    default:""
},





// PRICE


price:{

    min:{
        type:Number,
        default:0
    },


    max:{
        type:Number,
        default:0
    }

},





// CONTACT


contact:{

    phone:{
        type:String,
        default:""
    },


    email:{
        type:String,
        default:""
    }

},





// BOOKING AVAILABILITY


blockedDates:[
    {
        type:Date
    }
],





// TOP VENUE


isTop:{
    type:Boolean,
    default:false
},




// STATUS


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
    "Venue",
    venueSchema
);