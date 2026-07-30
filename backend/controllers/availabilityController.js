const Availability = require("../models/Availability");

// Get All

exports.getAvailability = async(req,res)=>{

    try{

        const data = await Availability.find()
        .populate("venueId","title")
        .sort({date:1});

        res.json(data);

    }catch(err){

        res.status(500).json(err);a

    }

};

// Get Unavailable Dates

exports.getUnavailableDates = async (req, res) => {
  try {
    const { venueId } = req.query;

    const data = await Availability.find({
      venueId,
      status: {
        $in: ["Booked", "Blocked", "Holiday", "Maintenance"],
      },
    }).select("date status reason");

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create

exports.addAvailability = async(req,res)=>{

    try{

        const data = await Availability.create(req.body);

        res.json(data);

    }catch(err){

        res.status(500).json(err);

    }

};

// Update

exports.updateAvailability = async(req,res)=>{

    try{

        const data = await Availability.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(data);

    }catch(err){

        res.status(500).json(err);

    }

};

// Delete

exports.deleteAvailability = async(req,res)=>{

    try{

        await Availability.findByIdAndDelete(req.params.id);

        res.json({
            message:"Deleted Successfully"
        });

    }catch(err){

        res.status(500).json(err);

    }

};