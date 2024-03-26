const express = require("express");
const { loginView, loginCheck } = require("../controllers/loginController");
const router = express.Router();

//get login page
router.get("/login", loginView);

//post login form
router.post("/login", loginCheck);

module.exports = router;
