//setting up middleware and database
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Authentication
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

//Mongo DB connection
const db = process.env.MONGOLAB_URI;
mongoose
  .connect(db, {})
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

// Set ejs files to show the views
app.set("view engine", "ejs");

//Body Parsing
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

//Route files
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

//Use routes
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
