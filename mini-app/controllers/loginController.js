const passport = require("passport");

//show login page
const loginView = (req, res) => {
  res.render("login", {});
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("/login", { email, password });
  } else {
    //This invokes the loginCheck function of passport file, also the function is passed req.body.email and req.body.password for this.
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};

module.exports = {
  loginView,
  loginUser,
};
