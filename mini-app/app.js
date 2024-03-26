//setting up middleware and database
const express = require("express");
const app = express();
const session = require("express-session");
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

//Always come before passport.session()
app.use(
  session({
    secret: "Happy Coding",
    resave: true,
    cookie: { secure: true },
    saveUninitialized: true,
  })
);

//initialize passport
app.use(passport.initialize());

// change the 'user' value from the client cookie into the true deserialized 'user' object
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
