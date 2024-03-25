const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Mongo DB connection
const db = process.env.MONGOLAB_URI;
mongoose
  .connect(db, {})
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
