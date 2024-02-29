const CatchAsyncHandler = require("../middleware/catchAsyncErrors");
const {sendToken} = require("../utils/jwtToken.js");
const User = require("../models/user.js");
const ErrorHandler = require("../utils/errorHandler.js");



exports.login = CatchAsyncHandler(async(req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Írj be egy E-mailt és jelszót", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Nincs ilyen E-mail és jelszó páros!"));
    }

    // const isPasswordCorrect = await user.comparePassword(password);

    // if (!isPasswordCorrect) {
    //     return next(new ErrorHandler("Nincs ilyen E-mail és jelszó páros!", 401));
    // }

    sendToken(user, 200, res);
})

exports.isLoggedIn = CatchAsyncHandler(async(request, response, next) => {
    const userToken = request.cookies.auth_token;

    if (!userToken) {
        return response.json(false);
    }

    // Verify token
    const verifiedToken = jwt.verify(userToken, process.env.JWT_SECRET);

    if (verifiedToken) {
        let userSource = await getUser(verifiedToken?.id)   
        // const fullUrl = request.protocol + '://' + request.get('host') + "/";
        // userSource.profilePicture = `${fullUrl}images/profiles/${userSource.profilePicture}`
        return response.json({token: userToken, user: userSource});
    }

    return response.json(null);
})

async function getUser(userID) {
    const user = await User.findById(userID);

    if (!user) {
        return "User not found";
    }

    return user;
};