const express = require("express");
const router = express.Router();
const {getAllProducts, addNewProduct, deleteProduct, updateProduct} = require("../controllers/productController.js");
const { isAuthenticatedUser } = require("../middleware/authentication.js");
const multer = require("multer");
const md5 = require("md5");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const productStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "public/images/products")
    },
    filename: function(req, file, cb) {
        const pathName = md5(`${uuidv4()}_${Date.now()}`) + path.extname(file.originalname)
        return cb(null, pathName)
    }
})

const updateImages = multer({storage: productStorage})

router.route("/product/").get(getAllProducts)
router.route("/product/").post(isAuthenticatedUser, updateImages.single("image"), addNewProduct)
router.route("/product/:id").delete(deleteProduct, isAuthenticatedUser)
router.route("/product/:id").put(updateImages.single("image"), updateProduct)

module.exports = router;