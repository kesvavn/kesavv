const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb://localhost:27017/expressdb")
.then(() => console.log("MongoDB Connected")).catch(err => console.log("Error: " + err));

// 📌 Schema

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, min: 0 }
});

// 📌 Model
const User = mongoose.model("User", userSchema);

// ✅ GET - ALL USERS
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.send(err.message);
    }
});


// ✅ POST - INSERT USER
app.post("/insert", async (req, res) => {
    try {
        const { name, age } = req.body;

        const user = new User({ name, age });
        await user.save();

        res.send("User Inserted Successfully");
    } catch (err) {
        res.send(err.message);
    }
});


// ✅ PUT - UPDATE USER
app.put("/update/:id", async (req, res) => {
    try {
        const { name, age } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, age },
            { new: true }
        );

        if (!user) return res.send("User Not Found");

        res.send("User Updated Successfully");
    } catch (err) {
        res.send(err.message);
    }
});


// ✅ GET - SEARCH USER
app.get("/search/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.send("User Not Found");

        res.json(user);
    } catch (err) {
        res.send(err.message);
    }
});


// ✅ DELETE USER
app.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.send("User Not Found");

        res.send("User Deleted Successfully");
    } catch (err) {
        res.send(err.message);
    }
});


// 🚀 Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
