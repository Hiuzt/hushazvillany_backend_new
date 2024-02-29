exports.sendToken = (user, statusCode, response) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
        path: "/"
    }

    response.status(statusCode).cookie('auth_token', token, options).json({
        success: true,
        token,
        user
    })

}
