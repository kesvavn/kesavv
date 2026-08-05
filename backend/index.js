require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


const app = express();


// Routes

const venueRoutes = require("./routes/venueRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const contactRoutes = require("./routes/ContactRoutes.js");
const requestRoutes = require("./routes/requestRoutes.js");
const galleryRoutes = require("./routes/galleryRoutes.js");
const cancellationPolicyRoutes = require("./routes/cancellationPolicyRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const pricingRoutes = require("./routes/pricingRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");
const paymentRoutes = require("./routes/paymentsRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const photoRoutes = require("./routes/photoRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");





const auth = require("./middleware/auth.js");


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

//photos
app.use(
"/api/photos",
photoRoutes
);

//uploads
app.use(
"/uploads",
express.static("uploads")
);

//gallery
app.use(
"/api/gallery",
galleryRoutes
);

//cancellation policies
app.use(
"/api/cancellation-policies",
cancellationPolicyRoutes
);

//reviews
app.use(
"/api/reviews",
reviewRoutes
);


//contact
app.use(
"/api/contact",
contactRoutes
);

//requests
app.use(
"/api/requests",
requestRoutes
);

//auth
app.use(
"/api/auth",
authRoutes
);

// admin
app.use(
"/api/admin",
adminRoutes
);

//pricing
app.use(
"/api/pricing",
pricingRoutes
);

//payment
app.use("/api/payments", paymentRoutes);

//availabile
app.use("/api/availability",availabilityRoutes);

//reports
app.use("/api/reports", require("./routes/reportsRoutes.js"));

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
