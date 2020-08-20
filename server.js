const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//* Load env vars
dotenv.config({ path: "./config/config.env" });

//* Connect to database
connectDB();

//* Route files
const bootcampsRouter = require("./routes/bootcamps");
const coursesRouter = require("./routes/courses");
const authRouter = require("./routes/auth");

const app = express();

//* Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* Body Parser
app.use(express.json());
//* Cookie Parser
app.use(cookieParser());

//* File Uploading
app.use(fileUpload());

//* Set static folder
app.use(express.static(path.join(__dirname, "public")));

//* Mount Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use("/api/v1/courses", coursesRouter);

//* ErrorHandler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//* Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //* Close server & exit process
  server.close(() => process.exit(1));
});
