const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/guestbookDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const guestSchema = new mongoose.Schema({
    name: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GuestMessage = mongoose.model(
    "GuestMessage",
    guestSchema
);

// Home Route
app.get("/", (req, res) => {
    res.send("📖 Guestbook Application Backend Running!");
});

// GET All Messages
app.get("/messages", async (req, res) => {
    const messages = await GuestMessage.find()
        .sort({ createdAt: -1 });

    res.json(messages);
});

// POST New Message
app.post("/messages", async (req, res) => {
    const newMessage = new GuestMessage({
        name: req.body.name,
        message: req.body.message
    });

    await newMessage.save();

    res.json({
        success: true,
        message: "Message Posted!"
    });
});

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );
});