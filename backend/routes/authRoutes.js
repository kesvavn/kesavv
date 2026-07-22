const express = require("express");
const router = express.Router();
const Register = require("../models/Register");
const Login = require("../models/Login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req,res)=>{

try{

const {name,password}=req.body;

const email = req.body.email.trim().toLowerCase();


const existingUser = await Register.findOne({
email
});


if(existingUser){

return res.status(400).json({
message:"Email already exists"
});

}


const hashedPassword = await bcrypt.hash(
password,
10
);


const user = new Register({

name,
email,
password:hashedPassword

});


await user.save();


res.status(201).json({

message:"Register Successfully"

});


}

catch(err){

console.log(err);

res.status(500).json({

message:"Server Error"

});

}

});
// ================= LOGIN =================

router.post("/login", async (req,res)=>{

console.log("LOGIN DATA:", req.body);

try {


const {password}=req.body;

const email = req.body.email.trim().toLowerCase();



const user = await Register.findOne({
email
});



if(!user){

return res.status(400).json({

message:"User not found"

});

}



const isMatch = await bcrypt.compare(

password,

user.password

);



if(!isMatch){

return res.status(400).json({

message:"Invalid Password"

});

}

user.lastLogin = new Date();
user.loginCount += 1;

await user.save();

console.log("Updated:", user);

const updatedUser = await Register.findById(user._id);
console.log("Updated User:", updatedUser);
// Save Login Collection

const loginData = await Login.findOne({
email:user.email
});


if(loginData){


await Login.findOneAndUpdate(
{
email:user.email
},
{
$set:{
lastLogin:new Date()
},
$inc:{
loginCount:1
}
}
);


}
else{


await Login.create({

name:user.name,

email:user.email,

password:user.password,

lastLogin:new Date(),

loginCount:1

});


}




// JWT Token

const token = jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.json({

token,

user

});


}

catch (err) {
  console.error("Login Error:", err);
  res.status(500).json({
    message: "Server Error"
  });
}


});
// ================= USER STATISTICS =================

router.get("/users-count", async(req,res)=>{

try{


const totalUsers = await Register.countDocuments();

// Today Login

const today = new Date();

today.setHours(0,0,0,0);


const todayLogin = await Register.countDocuments({
lastLogin:{
$gte: today
}
});


// New Users Today

const newUsers = await Register.countDocuments({createdAt:{$gte: today}});

res.json({

totalUsers,

todayLogin,

newUsers

});


}


catch(err){

console.log(err);

res.status(500).json({

message:"Server Error"

});

}


});

module.exports = router;