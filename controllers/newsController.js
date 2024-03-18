const CatchAsyncHandler = require("../middleware/catchAsyncErrors");
const News = require("../models/news");

exports.addNewNews = CatchAsyncHandler(async (req, res) => {
    if (req.file !== undefined) {
        req.body.image = req.file.filename 
    }

    const news = await News.create(req.body);

    res.status(201).json({
        success: true,
        news
    });

    res.status(201).json({msg: "OK"})
});

exports.getAllNews = CatchAsyncHandler(async (req, res) => {
    const news = await News.find();

    const fullUrl = req.protocol + '://' + req.get('host') + "/";
    news.forEach((newsSource) => {
        newsSource.image = `${fullUrl}images/news/${newsSource.image}`
    })
    
  
    res.status(200).json({
        success: true,
        news
    });
});

exports.deleteNews = CatchAsyncHandler(async (req, res) => {
    const news = await News.findByIdAndDelete(req.params.id) ;

    if (!news) {
        return next(new ErrorHandler("A hirdetés nem található", 404));
    }

    res.status(200).json({
        success: true,
        message: "A hirdetést sikeresen kitörölted!"
    });
})

exports.updateNews = CatchAsyncHandler(async (req, res, next) => {
    if (req.file !== undefined) {
        // KÉP TÖRLÉS 
        req.body.image = req.file.filename 
    }

    let news = await News.findById(req.params.id);
   
    if (!news) {
        return next(new ErrorHandler("A hirdetés nem található", 404))
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Sikeresen szerkesztetted a hirdetést!",
        news
    });
})
