const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo");

const upload = require("../middleware/upload");




// GET ALL PHOTOS

router.get("/",async(req,res)=>{


try{


const photos = await Photo.find()
.sort({
createdAt:-1
});


res.json(photos);


}
catch(error){

res.status(500).json({
message:error.message
});

}


});





router.post(
"/upload",
upload.array("images",30),
async(req,res)=>{


try{


if(!req.files || req.files.length===0){

return res.status(400).json({
message:"No images selected"
});

}



const photos=req.files.map((file)=>({

category:req.body.category,

album:req.body.album,

image:"/uploads/"+file.filename,

title:req.body.title,

description:req.body.description

}));



await Photo.insertMany(photos);



res.json({

success:true,

message:"Photos uploaded successfully",

count:req.files.length

});


}
catch(error){

res.status(500).json({
message:error.message
});

}


});




// DELETE PHOTO

router.delete("/:id",async(req,res)=>{


try{


await Photo.findByIdAndDelete(
req.params.id
);



res.json({

success:true,

message:"Deleted"

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


});

//albums
router.get("/albums",async(req,res)=>{

try{

const albums=await Photo.aggregate([

{
$match:{
category:"wedding"
}
},

{
$group:{
_id:"$album",
coverImage:{
$first:"$image"
},
count:{
$sum:1
}
}
},

{
$sort:{
_id:1
}
}

]);

res.json(albums);

}
catch(error){

res.status(500).json({
message:error.message
});

}

});

// GET PHOTOS BY ALBUM
router.get("/album/:album", async (req, res) => {
  try {
    const photos = await Photo.find({
      album: req.params.album,
    }).sort({ createdAt: -1 });

    res.json(photos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports=router;