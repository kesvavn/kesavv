const express = require("express");
const router = express.Router();

const Review = require("../models/Review");


// Get Reviews

router.get("/", async(req,res)=>{

try{

const reviews = await Review.find({
status:"Approved"
})
.sort({
createdAt:-1
});


res.json(reviews);


}catch(error){

res.status(500).json({
message:error.message
});

}

});



// Add Review

router.post("/", async(req,res)=>{

try{

const review = new Review(req.body);

await review.save();


res.status(201).json(review);


}catch(error){

res.status(500).json({
message:error.message
});

}

});


module.exports = router;