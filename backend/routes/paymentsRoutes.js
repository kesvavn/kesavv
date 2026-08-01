const express = require("express");
const router = express.Router();
const path = require("path");

const Payment = require("../models/Payment");
const Request = require("../models/Request");

const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

const generateReceiptPDF =
require("../utils/receiptGenerator");

// =============================
// EMAIL
// =============================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



// =============================
// GET CONFIRMED BOOKINGS
// =============================

router.get("/confirmed-bookings", async (req, res) => {
  try {

    const bookings = await Request.find({
      status: "Confirmed",
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// =============================
// ADD PAYMENT
// =============================

router.post("/", async (req, res) => {

  try {

    const payment = new Payment(req.body);

    await payment.save();

    // Update Request
   const booking = await Request.findByIdAndUpdate(
  req.body.bookingId,
  {
    paymentStatus: req.body.paymentStatus,
    paymentMethod: req.body.paymentMethod,
    advanceAmount: req.body.advanceAmount,
    balanceAmount: req.body.balanceAmount,
    paymentId: payment._id,
  },
  { new: true }
);

    // Send Email
    if (booking && booking.email) {

      const pdfBuffer =
await generateReceiptPDF(payment);



await transporter.sendMail({

from: process.env.EMAIL_USER,

to: booking.email,

subject:
"Payment Receipt - Events Management Kerala",


html:`

<h2>Payment Received Successfully</h2>

<p>
Hello <b>${booking.fullName}</b>,
</p>

<p>
Your payment receipt is attached with this email.
</p>


<p>
Thank you for choosing Events Management Kerala.
</p>

`,


attachments:[

{
filename:
`Receipt-${payment.invoiceNumber}.pdf`,

content:
pdfBuffer,

contentType:
"application/pdf"
}

]
});

    }

    res.status(201).json({
      success: true,
      message: "Payment Saved Successfully",
      data: payment,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});


// =============================
// GET ALL PAYMENTS
// =============================

router.get("/", async (req, res) => {

  try {

    const payments = await Payment.find().sort({
      createdAt: -1,
    });

    res.json(payments);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// =============================
// PAYMENT DASHBOARD STATS
// =============================

router.get("/dashboard/stats", async (req, res) => {
  try {
    const payments = await Payment.find();

    const totalPayments = payments.length;

    const totalCollected = payments.reduce(
      (sum, item) => sum + Number(item.advanceAmount || 0),
      0
    );

    const totalBalance = payments.reduce(
      (sum, item) => sum + Number(item.balanceAmount || 0),
      0
    );

    const fullyPaid = payments.filter(
      (item) => item.paymentStatus === "Paid"
    ).length;

    const partialPaid = payments.filter(
      (item) => item.paymentStatus === "Partial"
    ).length;

    const pendingPayments = payments.filter(
      (item) => item.paymentStatus === "Pending"
    ).length;

    res.json({
      totalPayments,
      totalCollected,
      totalBalance,
      fullyPaid,
      partialPaid,
      pendingPayments,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =============================
// PAYMENT RECEIPT PDF
// =============================

router.get("/receipt/:id", async (req, res) => {

  try {

    const payment = await Payment.findById(req.params.id);

    if (!payment) {

      return res.status(404).json({
        message: "Payment not found",
      });

    }


    // QR DATA

    const qrData = `
    Invoice : ${payment.invoiceNumber}
    Customer : ${payment.customerName}
    Amount : ${payment.totalAmount}
    Status : ${payment.paymentStatus}
    `;


    const qrImage = await QRCode.toDataURL(qrData);



    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });



    res.setHeader(
      "Content-Type",
      "application/pdf"
    );


    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Receipt-${payment.invoiceNumber}.pdf`
    );


    doc.pipe(res);



    // HEADER


doc.moveDown(5);


// COMPANY DETAILS

doc
.fontSize(18)
.text(
"Events Management Kerala",
{
align:"center"
}
);


doc
.fontSize(10)
.text(
"Premium Event Management Services",
{
align:"center"
}
);


doc
.fontSize(10)
.text(
"Address: Kochi, Kerala, India",
{
align:"center"
}
);


doc
.fontSize(10)
.text(
"GSTIN: 32ABCDE1234F1Z5",
{
align:"center"
}
);


doc.moveDown(2);


doc
.fontSize(16)
.text(
"PAYMENT RECEIPT",
{
align:"center"
}
);


doc.moveDown(2);



    // DETAILS


    doc.fontSize(12);


    doc.text(
      `Invoice Number : ${payment.invoiceNumber}`
    );


    doc.text(
      `Payment Date : ${payment.paymentDate.toDateString()}`
    );


    doc.moveDown();



    doc.fontSize(14)
    .text("Customer Details");


    doc.fontSize(12);

    doc.text(
      `Name : ${payment.customerName}`
    );


    doc.text(
      `Venue : ${payment.venueName}`
    );


    doc.moveDown();



    doc.fontSize(14)
    .text("Payment Details");


    doc.fontSize(12);


   const gst = payment.totalAmount * 0.18;

const grandTotal =
payment.totalAmount + gst;


doc.text(
  `Sub Total : ₹ ${payment.totalAmount}`
);


doc.text(
  `GST (18%) : ₹ ${gst.toFixed(2)}`
);


doc.text(
  `Grand Total : ₹ ${grandTotal.toFixed(2)}`
);


doc.text(
  `Advance Paid : ₹ ${payment.advanceAmount}`
);


doc.text(
  `Balance Amount : ₹ ${payment.balanceAmount}`
);


doc.text(
  `Payment Method : ${payment.paymentMethod}`
);


doc.text(
  `Payment Status : ${payment.paymentStatus}`
);


doc.moveDown(2);



    // QR IMAGE

    const qrBuffer = Buffer.from(
      qrImage.split(",")[1],
      "base64"
    );


    doc.text("Scan QR For Verification");


    doc.image(
      qrBuffer,
      {
        width:120,
        align:"center"
      }
    );



    doc.moveDown(3);



    // FOOTER


    doc
    .fontSize(10)
    .text(
      "Thank you for choosing Events Management Kerala",
      {
        align:"center"
      }
    );



    doc.end();



  } 
 catch(err){

  console.log(err);

  if(!res.headersSent){
    res.status(500).json({
      message:err.message
    });
  }

}

});
// =============================
// GET SINGLE PAYMENT
// =============================

router.get("/:id", async (req, res) => {

  try {

    const payment = await Payment.findById(req.params.id);

    if (!payment) {

      return res.status(404).json({
        message: "Payment not found",
      });

    }

    res.json(payment);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// =============================
// UPDATE PAYMENT
// =============================

router.put("/:id", async (req, res) => {

  try {

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!payment) {

      return res.status(404).json({
        message: "Payment not found",
      });

    }

    res.json({
      success: true,
      message: "Payment Updated",
      data: payment,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// =============================
// DELETE PAYMENT
// =============================

router.delete("/:id", async (req, res) => {

  try {

    await Payment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Payment Deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


module.exports = router;