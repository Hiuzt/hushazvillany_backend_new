const express = require("express");
const router = express.Router();
const {login, isLoggedIn, createUser} = require("../controllers/authController.js")

router.route("/auth/login").post(login)
router.route("/auth/isLoggedIn").get(isLoggedIn)


module.exports = router;