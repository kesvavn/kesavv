/*
const express = require("express");
const router = express.Router();

const Event = require("../models/Event");


// ===============================
// CREATE EVENT
// ===============================

router.post("/", async (req, res) => {

  try {


    const {
      eventName,
      category,
      startingPrice,
      maxGuests,
      duration,
      status,
      image
    } = req.body;



    const event = new Event({

      eventName,

      category,

      startingPrice,

      maxGuests,

      duration,

      status,

      image

    });



    await event.save();



    res.status(201).json({

      message:"Event Added Successfully",

      data:event

    });



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});





// ===============================
// GET ALL EVENTS
// ===============================

router.get("/", async(req,res)=>{

  try{


    const events = await Event.find()
    .sort({
      createdAt:-1
    });



    res.json(events);


  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }

});





// ===============================
// GET SINGLE EVENT
// ===============================

router.get("/:id", async(req,res)=>{

  try{


    const event = await Event.findById(
      req.params.id
    );



    if(!event){

      return res.status(404).json({

        message:"Event Not Found"

      });

    }



    res.json(event);



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});





// ===============================
// UPDATE EVENT
// ===============================

router.put("/:id", async(req,res)=>{

  try{


    const updatedEvent =
    await Event.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true
      }

    );



    if(!updatedEvent){

      return res.status(404).json({

        message:"Event Not Found"

      });

    }



    res.json({

      message:"Event Updated Successfully",

      data:updatedEvent

    });



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});





// ===============================
// DELETE EVENT
// ===============================

router.delete("/:id", async(req,res)=>{

  try{


    const deleted =
    await Event.findByIdAndDelete(
      req.params.id
    );



    if(!deleted){

      return res.status(404).json({

        message:"Event Not Found"

      });

    }



    res.json({

      message:"Event Deleted Successfully"

    });



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});



module.exports = router;
*/