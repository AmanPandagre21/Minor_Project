const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config/config.env" });
}

const errorMiddleware = require("./middleware/error");
const corsOptions = {
  credentials: true,
  origin: [process.env.FRONT_URI],
};

// use Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limt: "50mb", extended: true }));
app.use(fileUpload());

//  import routes
const user = require("./routes/userRoute");
const travelAgencies = require("./routes/travelAgenciesRoute");
const driver = require("./routes/driverRoute");
const carAttacher = require("./routes/carAttacherRoute");
const booking = require("./routes/bookingRoutes");

// use Routes
app.use("/api/v1", user);
app.use("/api/v1/agency", travelAgencies);
app.use("/api/v1/driver", driver);
app.use("/api/v1/car", carAttacher);
app.use("/api/v1/bookings", booking);

// error handler middleware
app.use(errorMiddleware);

module.exports = app;
