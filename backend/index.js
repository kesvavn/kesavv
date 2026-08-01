require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


const app = express();


// Routes

const venueRoutes = require("./routes/venueRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const requestRoutes = require("./routes/requestRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const cancellationPolicyRoutes = require("./routes/cancellationPolicyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");
app.use("/api/requests", require("./routes/requestRoutes"));
const notificationRoutes = require("./routes/notificationRoutes");

const auth = require("./middleware/auth");


// Middleware

app.use(cors());

app.use(express.json());


// MongoDB

mongoose.connect(
process.env.MONGO_URI || 
"mongodb://127.0.0.1:27017/event"
)
.then(()=>{
console.log("MongoDB Connected");
})
.catch(err=>{
console.log(err);
});


// Static

app.use(
"/uploads",
express.static(
path.join(__dirname,"uploads")
)
);


// API Routes


app.use(
"/api/upload",
uploadRoutes
);


app.use(
"/api/venues",
venueRoutes
);


app.use(
"/api/gallery",
galleryRoutes
);


app.use(
"/api/cancellation-policies",
cancellationPolicyRoutes
);


app.use(
"/api/contact",
contactRoutes
);


app.use(
"/api/requests",
requestRoutes
);


app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/admin",
adminRoutes
);

app.use(
"/api/pricing",
pricingRoutes
);
//payment
app.use("/api/payments", paymentRoutes);

//availabile
app.use("/api/availability",availabilityRoutes);

//reports
app.use("/api/reports", require("./routes/reportsRoutes"));

//notifications
app.use(
"/api/notifications",
notificationRoutes
);
// Test
app.get("/",(req,res)=>{
res.send("Backend Running");
});



// Protected

app.get(
"/profile",
auth,
(req,res)=>{
res.json({
message:"Welcome",
user:req.user
});
});



// Server

const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
console.log(
`Server Running On Port ${PORT}`
);
});
