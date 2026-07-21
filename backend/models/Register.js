const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true,
    trim:true
  },

  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },

  password:{
    type:String,
    required:true
  },


  // Last Login Time
  lastLogin:{
    type:Date,
    default:null
  },


  // Login Count
  loginCount:{
    type:Number,
    default:0
  }

},
{
  timestamps:true
}
);


module.exports = mongoose.model(
"Register",
registerSchema
);