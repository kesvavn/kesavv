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



// LOGO

const logoPath = path.join(
__dirname,
"../public/MELODIA-LOGO.png"
);

doc.image(
logoPath,
230,
40,
{
width:120
}
);



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



const gst =
payment.totalAmount * 0.18;


const grandTotal =
payment.totalAmount + gst;



doc.text(
`Sub Total : ₹ ${payment.totalAmount}`
);


doc.text(
`GST 18% : ₹ ${gst.toFixed(2)}`
);


doc.text(
`Grand Total : ₹ ${grandTotal.toFixed(2)}`
);


doc.text(
`Advance : ₹ ${payment.advanceAmount}`
);


doc.text(
`Balance : ₹ ${payment.balanceAmount}`
);


doc.text(
`Payment Method : ${payment.paymentMethod}`
);


doc.text(
`Status : ${payment.paymentStatus}`
);



doc.moveDown(3);


// SIGNATURE

const signaturePath =
path.join(
__dirname,
"../public/img.png"
);


doc.text(
"Authorized Signature"
);


doc.image(
signaturePath,
{
width:100
}
);



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