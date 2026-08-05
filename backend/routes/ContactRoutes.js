const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");


// Customer send message
router.post("/", async (req, res) => {
  try {

    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      contact
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});



// Admin get all messages
router.get("/", async(req,res)=>{

  try{

    const messages = await Contact.find()
    .sort({createdAt:-1});

    res.json(messages);

  }catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});



// Admin update message status
router.put("/:id", async(req,res)=>{

  try{

    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(message);

  }catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});


module.exports = router;