const express = require("express");
const {
  registerView,
  registerUser,
} = require("../controllers/registerController");
const router = express.Router();

//get register page
router.get("/register", registerView);

//post register form
router.post("/register", registerUser);

module.exports = router;
