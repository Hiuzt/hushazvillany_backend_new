const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncHandler = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = CatchAsyncHandler( async (request, response, next) => {
    const { auth_token } = request.cookies

    if (!auth_token) {
        return next(new ErrorHandler("Illetéktelen hozzáférés", 401));
    }

    const decodedToken = jwt.verify(auth_token, process.env.JWT_SECRET);

    if (!decodedToken) {
        return next(new ErrorHandler("Illetéktelen hozzáférés", 401));
    }

    next();
});

