const mongoose = require("mongoose");


const loginSchema = new mongoose.Schema(
{
name: {

type:String,

required:true,

},


email: {

type:String,

required:true,

unique:true,

lowercase:true,

trim:true

},


password: {

type:String,

required:true,

},


// Last Login Time

lastLogin: {

type:Date

},


// Login Count

loginCount: {

type:Number,

default:0

}


},
{
timestamps:true,
}
);


module.exports = mongoose.model(
"Login",
loginSchema
);