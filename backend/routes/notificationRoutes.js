const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");



// unread notification count

router.get("/count", async(req,res)=>{

try{

const count = await Notification.countDocuments({
    isRead:false
});


res.json({
    count
});


}
catch(error){

res.status(500).json({
    message:error.message
});

}

});




// get all notifications

router.get("/", async(req,res)=>{

try{

const notifications = await Notification.find()
.sort({
    createdAt:-1
});


res.json(notifications);


}
catch(error){

res.status(500).json({
message:error.message
});

}

});




// mark notification read

router.put("/:id/read", async(req,res)=>{

try{


await Notification.findByIdAndUpdate(
req.params.id,
{
isRead:true
}
);


res.json({
message:"Notification read"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}

});

router.post("/test", async(req,res)=>{

try{

const data = await Notification.create({

title:"Test Notification",

message:"Notification working",

type:"Booking",

isRead:false

});


res.json(data);

}
catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

});

module.exports = router;