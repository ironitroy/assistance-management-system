const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path")

const errorMiddleware = require("./middleware/error");



if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



//Routes Imports
const application = require("./routes/applicationRoutes")
const pickup = require("./routes/pickupRoutes")
const user = require("./routes/userRoutes");

app.use("/api/v1",application);
app.use("/api/v1",pickup);
app.use("/api/v1",user)



app.use(express.static(path.join(__dirname,'build')));

app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname, 'build','index.html'));
  });



// Middleware for Errors
app.use(errorMiddleware);

module.exports = app