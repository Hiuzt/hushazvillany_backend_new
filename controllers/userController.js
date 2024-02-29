const CatchAsyncHandler = require("../middleware/catchAsyncErrors");
const User = require("../models/user");

exports.addUser = CatchAsyncHandler(async(req, res, next) => {
    const {email, password, username, name} = req.body;

    if (!email || !password || !username || !name) {
        return next(new ErrorHandler("Tölts ki minden mezőt!", 400))
    }

    const userEmail = await User.findOne({ email });
    
    if (userEmail) {
        return next (new ErrorHandler("Ez az email cím már használatban van."))
    }

    const userName = await User.findOne({ username });

    if (userName) {
        return next (new ErrorHandler("Ez a felhasználónév már használatban van."))
    }

    const user = await User.create({
        name,
        email,
        username,
        password
    });

    await user.save();

    res.status(200).json({
        success: true,
        user
    })
});

exports.getUsers = CatchAsyncHandler(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

exports.deleteUser = CatchAsyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id) ;

    if (!user) {
        return next(new ErrorHandler("Nem található ez a felhasználó!", 404));
    }

    user.deleteOne();

    res.status(200).json({
        success: true,
        message: "A felhasználó sikeresen törölve lett."
    });
})

exports.updateUser = CatchAsyncHandler(async(req, res, next) => {
    console.log(req.body)
    let user = await User.findById(req.params.id);

    if (req.body.password === "") {
        req.body.password = user.password
    }

    if (!user) {
        return next(new ErrorHandler("Nem található ez a felhasználó!", 404));
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
})