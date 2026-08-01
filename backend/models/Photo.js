const mongoose = require("mongoose");


const photoSchema = new mongoose.Schema({

    category:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },


    image:{
        type:String,
        required:true
    },


    title:{
        type:String,
        default:""
    },


    description:{
        type:String,
        default:""
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Photo",
    photoSchema
);