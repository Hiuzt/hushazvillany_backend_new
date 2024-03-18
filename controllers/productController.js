const CatchAsyncHandler = require("../middleware/catchAsyncErrors");
const Product = require("../models/product");

exports.getAllProducts = CatchAsyncHandler(async(req, res, next) => {
    const products = await Product.find();

    const fullUrl = req.protocol + '://' + req.get('host') + "/";
    products.forEach((productSource, productIndex) => {
        productSource.image = `${fullUrl}images/products/${productSource.image}`
    })
    
  
    res.status(200).json({
        success: true,
        products
    });
})

exports.addNewProduct = CatchAsyncHandler(async(req, res, next) => {
    if (req.file !== undefined) {
        req.body.image = req.file.filename 
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });

    res.status(201).json({msg: "OK"})
})

exports.deleteProduct = CatchAsyncHandler(async (req, res, next) => {
    console.log(req.params.id)
    const product = await Product.findByIdAndDelete(req.params.id) ;

    if (!product) {
        return next(new ErrorHandler("A termék nem található", 404));
    }

    res.status(200).json({
        success: true,
        message: "A terméket sikeresen kitörölted!"
    });
})


exports.updateProduct = CatchAsyncHandler(async (req, res, next) => {
    if (req.file !== undefined) {
        req.body.image = req.file.filename 
    }
    let product = await Product.findById(req.params.id);
   
    if (!product) {
        return next(new ErrorHandler("A termék nem található", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Sikeresen szerkesztetted a terméket!",
        product
    });
})
