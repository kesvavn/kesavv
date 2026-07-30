const express = require("express");

const router = express.Router();

const Pricing = require("../models/Pricing");



// =========================
// CREATE PRICE
// POST /api/pricing
// =========================

router.post("/", async(req,res)=>{

try{


const pricing = new Pricing(req.body);


const savedPricing = await pricing.save();


res.status(201).json(savedPricing);



}catch(error){

res.status(500).json({

message:error.message

});


}

});






// =========================
// GET ALL PRICING
// GET /api/pricing
// =========================


router.get("/", async(req,res)=>{


try{


const pricing = await Pricing.find()
.sort({createdAt:-1});


res.json(pricing);



}catch(error){


res.status(500).json({

message:error.message

});


}


});







// =========================
// UPDATE PRICE
// PUT /api/pricing/:id
// =========================


router.put("/:id", async(req,res)=>{


try{


const updatedPricing =
await Pricing.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(updatedPricing);



}catch(error){


res.status(500).json({

message:error.message

});


}


});







// =========================
// DELETE PRICE
// DELETE /api/pricing/:id
// =========================


router.delete("/:id",async(req,res)=>{


try{


await Pricing.findByIdAndDelete(
req.params.id
);


res.json({

message:"Pricing deleted"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


});






module.exports = router;