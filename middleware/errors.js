const ErrorHandler = require("../utils/errorHandler");


module.exports = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    // Wrong mongoDB Object ID error
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message, 400);
    }

    if (error.name === "ValidationError") {
        console.log(error.erros)
        // const message = Object.values(error.erros).map(value => value.message);
        // error = new ErrorHandler(message, 400);
    }

    // Duplicate unique entries

    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }


    // Invalid JWT

    if (error.name === "JsonWebTokenError") {
        const message = "JWT is invalid."
        error = new ErrorHandler(message, 400)
    }

    // Expired JWT

    if (error.name === "TokenExpiredError") {
        const message = "JWT is expired";
        error = new ErrorHandler(message, 400)
    }


    response.status(error.statusCode).json({
        success: false,
        error: error.stack
    })
}