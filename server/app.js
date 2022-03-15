const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config/config.env" });
}

const errorMiddleware = require("./middleware/error");

// use Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  import routes
const user = require("./routes/userRoute");
const travelAgencies = require("./routes/travelAgenciesRoute");

// use Routes
app.use("/api/v1", user);
app.use("/api/v1", travelAgencies);

// error handler middleware
app.use(errorMiddleware);

module.exports = app;
