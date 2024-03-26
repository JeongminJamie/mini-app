const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("Log in to see more please");
  res.redirect("/login");
};
const allowIf = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

module.exports = {
  protectRoute,
  allowIf,
};
