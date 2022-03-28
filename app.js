const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("http");
const sendEmail = require("./utils/sendEmail");
dotenv.config({ path: "./config/config.env" });
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log("server running")
});

var corsOptions = {
    // origin: "http://localhost:8081",
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
    console.log("hii")
})

app.post("/mail", async (req, res) => {
    
    await sendEmail({
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message
    });
    res.status(200).json({
        success: true,
        message: "mail send"
    })
})