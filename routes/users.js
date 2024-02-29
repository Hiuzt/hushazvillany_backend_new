const express = require("express");
const router = express.Router();
const {addUser, updateUser, deleteUser, getUsers} = require("../controllers/userController.js");
const { isAuthenticatedUser } = require("../middleware/authentication.js");

router.route("/user/").post(isAuthenticatedUser, addUser);
router.route("/user/:id").put(updateUser);
router.route("/user/:id").delete(isAuthenticatedUser, deleteUser);
router.route("/user/").get(isAuthenticatedUser, getUsers);

module.exports = router;