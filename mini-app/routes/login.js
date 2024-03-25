const express = require("express");
const {
  registerView,
  loginView,
  registerUser,
} = require("../controllers/loginController");
const router = express.Router();

//get register and login pages
router.get("/register", registerView);
router.get("/login", loginView);

//post register page
router.post("/register", registerUser);

module.exports = router;
