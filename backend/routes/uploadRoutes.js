const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();


// Storage Setup

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },


  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      file.originalname.replace(/\s+/g, "-");


    cb(null, uniqueName);

  }

});



// File Filter

const fileFilter = (req, file, cb) => {


  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];


  if(allowedTypes.includes(file.mimetype)){

    cb(null,true);

  }
  else{

    cb(
      new Error("Only image files are allowed"),
      false
    );

  }

};



// Multer

const upload = multer({

  storage,

  fileFilter,

  limits:{
    fileSize: 5 * 1024 * 1024
  }

});




// Upload API

router.post(
"/",
upload.single("image"),
(req,res)=>{


  if(!req.file){

    return res.status(400).json({

      message:"No image uploaded"

    });

  }



  res.json({

    message:"Image Uploaded Successfully",

    image:
    "/uploads/" + req.file.filename

  });


});


module.exports = router;