const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const Payment = require("../models/Payment");
const Venue = require("../models/Venue");
const Register = require("../models/Register");


// GET REPORT DATA
router.get("/", async (req, res) => {
  try {

    // Booking Reports
    const totalBookings = await Request.countDocuments();

    const confirmedBookings = await Request.countDocuments({
      status: "Confirmed"
    });

    const pendingBookings = await Request.countDocuments({
      status: "Pending"
    });

    const cancelledBookings = await Request.countDocuments({
      status: "Cancelled"
    });


    // Revenue Reports
    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );


    const paidPayments = await Payment.countDocuments({
      paymentStatus: "Paid"
    });

    const pendingPayments = await Payment.countDocuments({
      paymentStatus: "Pending"
    });


    // Customer Report
    const totalCustomers = await Register.countDocuments();


    // Venue Performance
    const venueReport = await Request.aggregate([
      {
        $group:{
          _id:"$venueName",
          bookings:{
            $sum:1
          }
        }
      },
      {
        $sort:{
          bookings:-1
        }
      },
      {
        $limit:5
      }
    ]);


    // Event Type Report
    const eventReport = await Request.aggregate([
      {
        $group:{
          _id:"$functionType",
          count:{
            $sum:1
          }
        }
      }
    ]);



    res.json({

      bookingReport:{
        totalBookings,
        confirmedBookings,
        pendingBookings,
        cancelledBookings
      },


      revenueReport:{
        totalRevenue,
        paidPayments,
        pendingPayments
      },


      customerReport:{
        totalCustomers
      },


      venueReport,


      eventReport

    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Report Error",
      error:error.message
    });

  }
});


module.exports = router;