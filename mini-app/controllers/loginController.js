const User = require("../models/User");
const bcrypt = require("bcrypt");

//show register page
const registerView = (req, res) => {
  res.render("register", {});
};

//sohw login page
const loginView = (req, res) => {
  res.render("login", {});
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

//Login check = Local Authentication

// const loginUser = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     console.log("Register first please");
//     res.redirect("/register");
//   }

//   User.findOne({ email: email }).then((user) => {
//     bcrypt.compare(user.password, hash, (err, result) => {
//       if (result) {
//         res.redirect("/");
//       } else {
//         console.log("Incorrect password");
//       }
//     });
  });
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
