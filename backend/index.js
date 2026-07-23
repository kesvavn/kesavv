require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const venueRoutes = require("./routes/venueRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const requestRoutes = require("./routes/requestRoutes");
const eventRoutes = require("./routes/eventRoutes");

//Admin
const adminRoutes = require("./routes/adminRoutes");

const auth = require("./middleware/auth");


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose
.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/event"
)
.then(()=>{
  console.log("MongoDB Connected");
})
.catch((err)=>{
  console.log("MongoDB Error:",err);
});


// Static Upload Folder
app.use(
  "/uploads",
  express.static(
    path.join(__dirname,"uploads")
  )
);


// Routes

// Upload
app.use(
  "/api/upload",
  uploadRoutes
);


// Venues
app.use(
  "/api/venues",
  venueRoutes
);

// Events
app.use(
  "/api/events",
  eventRoutes
);

// Contact
app.use(
  "/api/contact",
  contactRoutes
);

// Pricing Requests
app.use(
"/api/requests",
requestRoutes
);

// Register + Login
app.use(
  "/api/auth",
  authRoutes
);


// Home Test
app.get("/",(req,res)=>{
  res.send("Backend Running");
});


// Protected Route
app.get(
"/profile",
auth,
(req,res)=>{

res.json({
 message:"Welcome",
 user:req.user
});

});

// Admin Route
app.use(
"/api/admin",
adminRoutes
);


// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
 console.log(
 `Server Running On Port ${PORT}`
 );
});