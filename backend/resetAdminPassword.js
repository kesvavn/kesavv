const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://127.0.0.1:27017/event")
.then(async()=>{

    const email = "kesavan@gmail.com"; // unga admin email
    const newPassword = "Kesavan8015";   // new password

    const hashPassword = await bcrypt.hash(newPassword,10);

    const admin = await Admin.findOneAndUpdate(
        {email: email},
        {password: hashPassword}
    );

    if(admin){
        console.log("Password Reset Success");
    }
    else{
        console.log("Admin not found");
    }

    process.exit();

})
.catch(err=>{
    console.log(err);
});