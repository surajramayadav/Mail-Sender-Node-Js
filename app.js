const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("http");
const sendEmail = require("./utils/sendEmail");
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000
const server = app.listen(PORT);

var corsOptions = {
    // origin: "http://localhost:8081",
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.post("/mail", async (req, res) => {
    const { email, subject, message } = req.body
    await sendEmail({
        email: email,
        subject: subject,
        message: message,
    });
    res.status(200).json({
        success: true,
        message: "mail send"
    })
})