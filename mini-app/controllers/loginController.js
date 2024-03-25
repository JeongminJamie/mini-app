const User = require("../models/User");
const bcrypt = require("bcryptjs");

//show register page
const registerView = (req, res) => {
  res.render("register", {});
};

//sohw login page
const loginView = (req, res) => {
  res.render("login", {});
};

//when register form created
const registerUser = (req, res) => {
  const { name, email, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill the fields");
  }
  if (password !== confirm) {
    console.log("Confirm password doesn't match with your password");
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("Your email aleady exists");
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //Password hashing
        bcrypt.getSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login").catch((err) => console.log(err)));
          });
        });
      }
    });
  }
};

module.exports = {
  registerView,
  loginView,
  registerUser,
};
