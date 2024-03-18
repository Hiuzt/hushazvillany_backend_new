const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authentication.js");
const { getAllMessages, createNewMessage, replyToMessage } = require("../controllers/messageController.js");

router.route("/message/").get(isAuthenticatedUser, getAllMessages);
router.route("/message/").post(createNewMessage);
router.route("/message/:id").put(isAuthenticatedUser, replyToMessage)


module.exports = router;