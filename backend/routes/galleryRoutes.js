const express = require("express");
const router = express.Router();

const Venue = require("../models/Venue");


// ===============================
// UPLOAD GALLERY IMAGE
// ===============================

router.post("/:venueId", async (req, res) => {

    try {

        const { venueId } = req.params;


        const venue = await Venue.findById(venueId);


        if (!venue) {

            return res.status(404).json({
                message: "Venue not found"
            });

        }


        const images = req.files;


        if (!images || images.length === 0) {

            return res.status(400).json({
                message: "No images uploaded"
            });

        }



        images.forEach((file)=>{

            venue.gallery.push({

                url: `/uploads/${file.filename}`,

                alt:"Venue Image"

            });

        });



        await venue.save();



        res.json({

            success:true,

            message:"Gallery uploaded successfully",

            gallery:venue.gallery

        });



    }
    catch(err){

        console.log(err);


        res.status(500).json({

            success:false,

            message:"Upload failed",

            error:err.message

        });

    }

});




// ===============================
// DELETE GALLERY IMAGE
// ===============================


router.delete("/:venueId/:imageId", async(req,res)=>{


    try{


        console.log("DELETE ROUTE HIT");

        console.log(req.params);



        const {
            venueId,
            imageId
        } = req.params;



        const venue = await Venue.findById(venueId);



        if(!venue){


            return res.status(404).json({

                message:"Venue not found"

            });


        }



        console.log(
            "Before Delete:",
            venue.gallery
        );



        venue.gallery = venue.gallery.filter(

            (img)=>

            img._id.toString() !== imageId

        );



        console.log(

            "After Delete:",
            venue.gallery

        );



        await venue.save();



        res.json({

            success:true,

            message:"Gallery image deleted successfully"

        });



    }
    catch(err){


        console.log(err);


        res.status(500).json({

            success:false,

            message:"Delete failed",

            error:err.message

        });


    }


});



module.exports = router;