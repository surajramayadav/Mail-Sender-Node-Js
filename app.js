const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("http");
const sendEmail = require("./utils/sendEmail");
dotenv.config({ path: "./config/config.env" });
const bodyParser = require("body-parser");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
    swaggerDefinition: {
        "swagger": "2.0",
        "info": {
          "version": "1.0.0", //version of the OpenAPI Specification
          "title": "Send Mail",
          "description": "Send Mail",
          "license": {
            "name": "MIT",
          }
        },
        "host": "localhost:4444",
        "basePath": "/",
        "tags": [
          {
            "name": "Users",
            "description": "API for users in the system"
          }
        ],
        "schemes": ["http"],
        "consumes": ["application/json"],
        "produces": ["application/json"]
      },
    // ['.routes/*.js']
    apis: ["app.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs",(req,res)=>{
    res.status(200).json(swaggerDocs)
})
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
app.use(bodyParser.json())



app.get("/test", (req, res) => {
    console.log("hii")
})

/**
 * @swagger
 * /mail:
 *   post:
 *     description: send mail 
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: mail
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *             email:
 *              type: string
 *             subject:
 *              type: string
 *             message:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
app.post("/mail", async (req, res) => {
    // console.log(req)
    await sendEmail({
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    res.status(200).json({
        success: true,
        message: "mail send"
    })
})