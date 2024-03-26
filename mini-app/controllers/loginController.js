const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

//show login page
const loginView = (req, res) => {
  res.render("login", {});
};

//Login check = Local Authentication
const loginCheck = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Check customer
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("Wrong email");
            return done();
          }
          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done();
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = {
  loginView,
  loginCheck,
};
