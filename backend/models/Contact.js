const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },

  phone:String,

  email:{
    type:String,
    required:true
  },

  message:{
    type:String,
    required:true
  },

  status:{
    type:String,
    enum:["Unread","Read","Replied"],
    default:"Unread"
  }

},
{
 timestamps:true
});


module.exports = mongoose.model("Contact", contactSchema);