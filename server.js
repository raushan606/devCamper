const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

//* Load env vars
dotenv.config({ path: "./config/config.env" });

//* Connect to database
connectDB();

//* Route files
const bootcampsRouter = require("./routes/bootcamps");
const coursesRouter = require("./routes/courses");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const reveiwsRouter = require("./routes/reviews");

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

//* Sanitize data
app.use(mongoSanitize());

//* Set security headers
app.use(helmet());

//* Prevent XSS attacks
app.use(xss());

//* Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//* Prevent HTTP param polution
app.use(hpp());

//* Enable CORS
app.use(cors());

//* Set static folder
app.use(express.static(path.join(__dirname, "public")));

//* Mount Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/reviews", reveiwsRouter);

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
