const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/authentication.js");
const multer = require("multer");
const md5 = require("md5");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { addNewNews, getAllNews, deleteNews, updateNews } = require("../controllers/newsController.js");

const newsStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "public/images/news")
    },
    filename: function(req, file, cb) {
        const pathName = md5(`${uuidv4()}_${Date.now()}`) + path.extname(file.originalname)
        return cb(null, pathName)
    }
})

const updateImages = multer({storage: newsStorage})

router.route("/news/").get(getAllNews)
router.route("/news/").post(updateImages.single("image"), addNewNews)
router.route("/news/:id").delete(deleteNews, isAuthenticatedUser)
router.route("/news/:id").put(isAuthenticatedUser, updateImages.single("image"), updateNews)

module.exports = router;