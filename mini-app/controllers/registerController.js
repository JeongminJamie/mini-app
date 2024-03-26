const bcrypt = require("bcrypt");
const User = require("../models/User");

//show register page
const registerView = (req, res) => {
  res.render("../views/register", {});
  console.log("Successfully load the register page");
};

//when register form submitted
const registerUser = (req, res) => {
  const { name, email, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill the fields");
  }
  if (password !== confirm) {
    console.log("Confirm password doesn't match with your password");
  } else {
    //when the email exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("Your email aleady exists");
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

module.exports = {
  registerView,
  registerUser,
};
