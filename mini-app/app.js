const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Mongo DB connection
const db = process.env.MONGOLAB_URI;
mongoose
  .connect(db, {})
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

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
