const express = require("express");
const { loginView, loginUser } = require("../controllers/loginController");
const router = express.Router();

//get login page
router.get("/login", loginView);

//post login form
router.post("/login", loginUser);

module.exports = router;
