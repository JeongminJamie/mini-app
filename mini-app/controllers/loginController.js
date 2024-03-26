const User = require("../models/User");
const bcrypt = require("bcrypt");

//show login page
const loginView = (req, res) => {
  res.render("login", {});
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Fille the fields properly");
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log("Wrong email");
    }
  });
};

module.exports = {
  loginView,
};
