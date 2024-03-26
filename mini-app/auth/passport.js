const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

//Login check = Local Authentication(put in the cookie session<express-session>)
//It's only invoked when passport.authenticate() used in the authentication route(mostly in login route)
//Also, this function is used in the index file, so it can be invoked properly
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
  loginCheck,
};
