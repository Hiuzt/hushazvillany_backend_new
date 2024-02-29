const CatchAsyncHandler = require("../middleware/catchAsyncErrors");
const Messages = require("../models/message");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require("../utils/sendEmail");

exports.getAllMessages = CatchAsyncHandler(async (req, res, next) => {
    const messages = await Messages.find();

    res.status(200).json({
        success: true,
        messages
    });
});

exports.createNewMessage = CatchAsyncHandler(async (req, res, next) => {

    const messages = await Messages.create(req.body);

    try {
        await sendEmail({
            email: "dniker69@gmail.com",
            subject: "Automatikus válasz a húsház villánytól",
            message: `
            <html lang="hu">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Automatikus üzenet</title>
                <style>
                    /* Reset styles */
                    body, html {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    }
    
                    /* Container */
                    .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f7f7f7;
                    }
    
                    /* Content */
                    .content {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
    
                    /* Title */
                    .title {
                    font-size: 24px;
                    color: #C42329;
                    margin-bottom: 20px;
                    }
    
                    /* Message */
                    .message {
                    font-size: 16px;
                    color: #000;
                    font-weight: 700;
                    line-height: 1.6;
                    }
    
                    .message2 {
                        color: #333;
                        font-size: 14px;
                    }
    
                    .message3 {
                        color: #A9A9A9;
                        font-size: 14px;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="content">
                    <h2 class="title">Automatikusan generált levél a Húsház Villánytól</h2>
                    <p class="message">Kedves ${req.body.name},</p>
                    <p class="message2">Egy kollégánk hamarosan felveszi önnel a kapcsolatot, addig kérem várakozzon türelemmel. </p>
                    <p class="message3">Ez egy automatikusan generált üzenet! Az átlag válaszidő 24 óra ehhez kérjük türelmedet, üzenetedet megkaptuk és hamarosan válaszolunk..</p>
                    </div>
                </div>
                </body>
                </html>
                        `,
            
        })

        res.status(201).json({
            success: true,
            message: "Sikeresen elküldted az üzenetet!",
            messages
        });

    } catch (error) {
        next(new ErrorHandler("Internal Server Error"), 500)
    }
        
})