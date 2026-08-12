const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const Pricing = require("../models/Pricing");
const auth = require("../middleware/auth");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const path = require("path");

// ========================================
// EMAIL TRANSPORTER
// ========================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ========================================
// CREATE REQUEST
// ========================================

router.post("/", auth, async (req, res) => {
  try {
    const request = new Request({
      ...req.body,
      userId: req.user.id,
    });

   await request.save();


// Create Notification

await Notification.create({

    title:"New Booking Request",

    message:`${request.fullName} requested ${request.venueName} booking`,

    type:"Booking",

    isRead:false

});


res.status(201).json({
  success: true,
  message: "Request Submitted Successfully",
  data: request,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ========================================
// GET BOOKED DATES
// ========================================

router.get("/booked-dates", async (req, res) => {
  try {
    const { venueName } = req.query;

    const bookings = await Request.find({
      venueName,
      status: "Confirmed",
    });

    const bookedDates = bookings.map(
      (booking) => booking.functionDate
    );

    res.json(bookedDates);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ========================================
// MY BOOKINGS
// ========================================

router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Request.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ========================================
// CUSTOMER BOOKING HISTORY
// ========================================

router.get("/history/:phone", async (req, res) => {
  try {
    const history = await Request.find({
      phone: req.params.phone,
    }).sort({
      createdAt: -1,
    });

    if (history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No booking history found",
      });
    }

    res.status(200).json({
      success: true,
      totalBookings: history.length,
      data: history,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ========================================
// DOWNLOAD RECEIPT PDF
// ========================================

router.get("/receipt/:id", async (req, res) => {

  try {

    const booking = await Request.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    // Create PDF
    const doc = new PDFDocument({
      margin: 50,
    });

    // Response Headers
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Receipt-${booking._id}.pdf`
    );

    // Pipe PDF to response
    doc.pipe(res);

    const logo = path.join(
  __dirname,
  "../public/MELODIA-LOGO-03-1.webp"
);

try {
  doc.image(logo, 50, 35, {
    width: 70,
  });
} catch (err) {
  console.log("Logo not found");
}

// Company Name
doc
  .fontSize(24)
  .fillColor("#0d6efd")
  .font("Helvetica-Bold")
  .text("EVENTS MANAGEMENT KERALA", 130, 45);

// Address
doc
  .fontSize(10)
  .fillColor("#555")
  .font("Helvetica")
  .text("Thrissur, Kerala - 680001", 130)
  .text("Phone : +91 9876543210", 130)
  .text("Email : info@eventsmanagementkerala.com", 130)
  .text("Website : www.eventsmanagementkerala.com", 130);

// Horizontal Line
doc
  .moveTo(50, 135)
  .lineTo(550, 135)
  .strokeColor("#0d6efd")
  .lineWidth(2)
  .stroke();

// Receipt Title
doc
  .moveDown(2)
  .fontSize(20)
  .fillColor("#198754")
  .font("Helvetica-Bold")
  .text("BOOKING RECEIPT", {
    align: "center",
  });

// Invoice Number Box
doc
  .roundedRect(380, 175, 160, 70, 8)
  .fillAndStroke("#f8f9fa", "#0d6efd");

doc
  .fillColor("#000")
  .fontSize(11)
  .font("Helvetica-Bold")
  .text(`Invoice : ${booking.invoiceNumber}`, 390, 190);

doc
  .text(`Booking ID`, 390, 210);

doc
  .font("Helvetica")
  .text(`${booking._id}`, 390, 225);

doc.moveDown(3);

  
 // ========================================
// CALCULATIONS
// ========================================

const subtotal = booking.totalPrice || 0;

const gst = booking.gst || 18;

const gstAmount =
  booking.gstAmount || (subtotal * gst) / 100;

const grandTotal =
  booking.grandTotal || (subtotal + gstAmount);

const advance =
  booking.advanceAmount || 0;

const balance =
  booking.balanceAmount || (grandTotal - advance);

// ========================================
// CUSTOMER DETAILS
// ========================================

doc.moveDown();

doc
  .roundedRect(50, doc.y, 500, 30, 5)
  .fill("#0d6efd");

doc
  .fillColor("white")
  .font("Helvetica-Bold")
  .fontSize(14)
  .text("CUSTOMER DETAILS", 65, doc.y + 8);

doc.y += 40;

doc
  .fillColor("black")
  .font("Helvetica")
  .fontSize(12);

doc.text(`Name : ${booking.fullName}`);
doc.text(`Phone : ${booking.phone}`);
doc.text(`Email : ${booking.email}`);

doc.moveDown();

// ========================================
// BOOKING DETAILS
// ========================================

const bookingY = doc.y;

doc
  .roundedRect(50, bookingY, 500, 30, 5)
  .fill("#0d6efd");

doc
  .fillColor("white")
  .font("Helvetica-Bold")
  .fontSize(14)
  .text("BOOKING DETAILS", 65, bookingY + 8);

doc.y = bookingY + 40;

doc
  .fillColor("black")
  .font("Helvetica")
  .fontSize(12);

doc.text(`Booking ID : ${booking._id}`);
doc.text(`Invoice No : ${booking.invoiceNumber}`);
doc.text(`Venue : ${booking.venueName}`);
doc.text(`Function : ${booking.functionType}`);
doc.text(`Date : ${booking.functionDate}`);
doc.text(`Guests : ${booking.guests}`);
doc.text(`AC Rooms : ${booking.acRooms || 0}`);
doc.text(`Non-AC Rooms : ${booking.nonAcRooms || 0}`);



// ========================================
// DISPLAY PAYMENT VALUES
// ========================================

doc.text(
  `Subtotal : ₹ ${subtotal.toLocaleString()}`
);

doc.text(
  `GST (${gst}%) : ₹ ${gstAmount.toLocaleString()}`
);

doc.text(
  `Advance : ₹ ${advance.toLocaleString()}`
);

doc.text(
  `Balance : ₹ ${balance.toLocaleString()}`
);

doc.text(
  `Grand Total : ₹ ${grandTotal.toLocaleString()}`
);

doc.text(
  `Payment Method : ${booking.paymentMethod || "Cash"}`
);

doc.text(
  `Status : ${booking.status}`
);

// ========================================
// QR CODE
// ========================================

const qrData = `
Booking ID : ${booking._id}
Customer : ${booking.fullName}
Venue : ${booking.venueName}
Amount : ₹${grandTotal}
Status : ${booking.status}
`;

const qrImage = await QRCode.toDataURL(qrData);

doc.image(qrImage, 50, doc.y + 20, {
  fit: [90, 90],
});

// ========================================
// AUTHORIZED SIGNATURE
// ========================================

doc.moveDown(2);

// Signature Line
doc
  .moveTo(380, doc.y)
  .lineTo(540, doc.y)
  .strokeColor("#000")
  .lineWidth(1)
  .stroke();

doc.moveDown(0.5);

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor("#000")
  .text("Authorized Signature", 390);

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#666")
  .text("Events Management Kerala", 385);
// ========================
// FOOTER
// ========================

doc.moveDown(2);

// Line
doc
  .moveTo(50, doc.y)
  .lineTo(550, doc.y)
  .strokeColor("#999")
  .lineWidth(1)
  .stroke();

doc.moveDown();

// Company Name
doc
  .fillColor("#0d6efd")
  .font("Helvetica-Bold")
  .fontSize(12)
  .text(
    "EVENTS MANAGEMENT KERALA",
    {
      align: "center",
    }
  );

// Thank You
doc
  .fillColor("#666")
  .font("Helvetica")
  .fontSize(10)
  .text(
    "Thank you for choosing Events Management Kerala.",
    {
      align: "center",
    }
  );

// Website
doc
  .fillColor("#0d6efd")
  .fontSize(10)
  .text(
    "www.eventsmanagementkerala.com",
    {
      align: "center",
    }
  );

// Note
doc
  .fillColor("#999")
  .fontSize(9)
  .text(
    "This is a computer generated receipt. No signature is required.",
    {
      align: "center",
    }
  );

doc.end();
}
 catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});

// ========================================
// CONFIRM BOOKING & SEND EMAIL
// ========================================

router.put("/confirm/:id", async (req, res) => {
  try {
    const booking = await Request.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ========================================
    // CONFIRM BOOKING
    // ========================================

    booking.status = "Confirmed";

    // ========================================
    // INVOICE NUMBER
    // ========================================

    booking.invoiceNumber =
      "INV-" +
      new Date().getFullYear() +
      "-" +
      booking._id.toString().slice(-6).toUpperCase();


// ========================================
// GST CALCULATION
// ========================================

const subtotal = booking.totalPrice || 0;

// Get GST from Admin Pricing
const gstPricing = await Pricing.findOne({
  category: "GST",
  title: "GST",
  status: true
});

const gst = gstPricing
  ? Number(gstPricing.amount)
  : 18;

// GST amount
const gstAmount = (subtotal * gst) / 100;

// Grand Total
const grandTotal = subtotal + gstAmount;

// Advance
const advance = booking.advanceAmount || 0;

// Balance
const balance = grandTotal - advance;
    // ========================================
    // SAVE GST + PAYMENT DETAILS
    // ========================================

    booking.gst = gst;
    booking.gstAmount = gstAmount;
    booking.grandTotal = grandTotal;
    booking.balanceAmount = balance;

    await booking.save();

    // ========================================
    // NOTIFICATION
    // ========================================

    await Notification.create({
      title: "Booking Confirmed",
      message: `${booking.fullName} booking confirmed for ${booking.venueName}`,
      type: "Confirmation",
      isRead: false
    });

    // ========================================
    // SEND EMAIL
    // ========================================

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: "Booking Confirmation",

      html: `
        <div style="font-family:Arial;padding:20px">

          <h2 style="color:green;">
            Booking Confirmed
          </h2>

          <p>Hello <b>${booking.fullName}</b>,</p>

          <p>Your booking has been confirmed successfully.</p>

          <hr>

          <table cellpadding="8">

            <tr>
              <td><b>Invoice No</b></td>
              <td>${booking.invoiceNumber}</td>
            </tr>

            <tr>
              <td><b>Venue</b></td>
              <td>${booking.venueName}</td>
            </tr>

            <tr>
              <td><b>Event</b></td>
              <td>${booking.functionType}</td>
            </tr>

            <tr>
              <td><b>Date</b></td>
              <td>${booking.functionDate}</td>
            </tr>

            <tr>
              <td><b>Guests</b></td>
              <td>${booking.guests}</td>
            </tr>

            <tr>
              <td><b>AC Rooms</b></td>
              <td>${booking.acRooms || 0}</td>
            </tr>

            <tr>
              <td><b>Non-AC Rooms</b></td>
              <td>${booking.nonAcRooms || 0}</td>
            </tr>

            <tr>
              <td><b>Subtotal</b></td>
              <td>₹ ${subtotal.toLocaleString()}</td>
            </tr>

            <tr>
              <td><b>GST (${gst}%)</b></td>
              <td>₹ ${gstAmount.toLocaleString()}</td>
            </tr>

            <tr>
              <td><b>Advance Paid</b></td>
              <td>₹ ${advance.toLocaleString()}</td>
            </tr>

            <tr>
              <td><b>Balance Amount</b></td>
              <td>₹ ${balance.toLocaleString()}</td>
            </tr>

            <tr>
              <td><b>Grand Total</b></td>
              <td>₹ ${grandTotal.toLocaleString()}</td>
            </tr>

            <tr>
              <td><b>Status</b></td>
              <td>${booking.status}</td>
            </tr>

          </table>

          <br>

          <p>
            Thank you for choosing our Event Management Services.
          </p>

        </div>
      `,
    });

    res.json({
      success: true,
      message: "Booking confirmed and email sent successfully.",
      data: booking,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});

// ========================================
// UPDATE STATUS
// ========================================

router.put("/status/:id", async(req,res)=>{

try{

const booking = await Request.findById(req.params.id);


if(!booking){

return res.status(404).json({
message:"Request not found"
});

}


booking.status = req.body.status;


await booking.save();


res.json({

success:true,
message:"Status Updated",
data:booking

});


}
catch(err){

res.status(500).json({

message:err.message

});

}


});


// ========================================
// GET ALL REQUESTS
// ========================================

router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({
      createdAt: -1,
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ========================================
// GET SINGLE REQUEST
// ========================================

router.get("/:id", async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success:false,
        message:"Request not found"
      });
    }

    res.json({
      success:true,
      data:request
    });


  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});


// Delete Customer / Request
router.delete("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;