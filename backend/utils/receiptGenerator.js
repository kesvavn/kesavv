const PDFDocument = require("pdfkit");
const path = require("path");
const QRCode = require("qrcode");


const generateReceiptPDF = async (payment)=>{

return new Promise(async(resolve,reject)=>{

try{


const doc = new PDFDocument({
size:"A4",
margin:50
});

let buffers=[];


doc.on("data",(chunk)=>{

buffers.push(chunk);

});


doc.on("end",()=>{

resolve(Buffer.concat(buffers));

});


const qrData = `

Invoice : ${payment.invoiceNumber}

Customer : ${payment.customerName}

Amount : ${payment.totalAmount}

Status : ${payment.paymentStatus}

`;


const qrImage =
await QRCode.toDataURL(qrData);




doc.moveDown(5);



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


doc.text(
"Address: Kochi, Kerala, India",
{
align:"center"
}
);


doc.text(
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



doc.fontSize(12);



doc.text(
`Invoice Number : ${payment.invoiceNumber}`
);


doc.text(
`Customer : ${payment.customerName}`
);


doc.text(
`Venue : ${payment.venueName}`
);



doc.moveDown();



// =============================
// PAYMENT DETAILS
// =============================

doc
  .fontSize(14)
  .fillColor("black")
  .text("Payment Details", {
    underline: true,
  });

doc.moveDown(0.8);

const gst = payment.totalAmount * 0.18;
const grandTotal = payment.totalAmount + gst;

doc.fontSize(12);

doc.text(
  `Sub Total        : Rs. ${Number(payment.totalAmount).toLocaleString()}`
);
doc.moveDown(0.3);

doc.text(
  `GST (18%)        : Rs. ${gst.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
);
doc.moveDown(0.3);

doc.text(
  `Grand Total      : Rs. ${grandTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
);
doc.moveDown(0.3);

doc.text(
  `Advance Paid     : Rs. ${Number(payment.advanceAmount).toLocaleString()}`
);
doc.moveDown(0.3);

doc.text(
  `Balance Amount   : Rs. ${Number(payment.balanceAmount).toLocaleString()}`
);
doc.moveDown(0.3);

doc.text(
  `Payment Method   : ${payment.paymentMethod}`
);
doc.moveDown(0.3);

//remark
if (payment.remarks) {
  doc.moveDown(0.3);

  doc.text(
    `Remarks         : ${payment.remarks}`
  );
}

// Payment Status Color
let statusColor = "red";

if (payment.paymentStatus === "Paid") {
  statusColor = "green";
} else if (payment.paymentStatus === "Partial") {
  statusColor = "orange";
}

doc
  .fillColor(statusColor)
  .text(`Payment Status   : ${payment.paymentStatus}`);

doc.fillColor("black");

doc.moveDown(1);

// Divider Line
doc
  .moveTo(50, doc.y)
  .lineTo(545, doc.y)
  .stroke();

doc.moveDown(2);


doc.moveDown(3);




doc.moveDown(2);



const qrBuffer =
Buffer.from(
qrImage.split(",")[1],
"base64"
);



doc.text(
"Scan QR For Verification"
);



doc.image(
qrBuffer,
{
width:100
}
);



doc.end();



}catch(error){

reject(error);

}



});


};



module.exports = generateReceiptPDF;