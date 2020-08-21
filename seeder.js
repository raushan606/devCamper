const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//* Load env vars
dotenv.config({ path: "./config/config.env" });

//* Load models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const Users = require("./models/User");

//* Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//* Read JSON Files
const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const course = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const user = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

//* Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamp);
    await Course.create(course);
    await Users.create(user);

    console.log("Data Imported ...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//! Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await Users.deleteMany();

    console.log("Data Deleted ...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
