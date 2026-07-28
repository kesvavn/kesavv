const express = require("express");
const multer = require("multer");

const router = express.Router();


// Storage

const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},


filename:(req,file,cb)=>{

const uniqueName =
Date.now() +
"-" +
file.originalname.replace(/\s+/g,"-");


cb(null,uniqueName);

}


});




// File Filter

const fileFilter=(req,file,cb)=>{


const allowedTypes=[

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
fileSize:5 * 1024 * 1024
}

});





// SINGLE IMAGE UPLOAD
// Main Venue Image

router.post(
"/single",
upload.single("image"),

(req,res)=>{


if(!req.file){

return res.status(400).json({

message:"No image uploaded"

});

}


res.json({

message:"Single Image Uploaded",

image:
"/uploads/"+req.file.filename

});


});







// MULTIPLE IMAGE UPLOAD
// Gallery Images


router.post(
"/multiple",

upload.array("images",20),

(req,res)=>{


if(!req.files || req.files.length===0){

return res.status(400).json({

message:"No images uploaded"

});

}



const images=req.files.map(file=>({

url:
"/uploads/"+file.filename,

alt:"Venue Gallery Image"

}));



res.json({

message:"Gallery Uploaded Successfully",

images

});


});



module.exports=router;