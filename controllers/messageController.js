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

exports.replyToMessage = CatchAsyncHandler(async (req, res, next) => {
    const messageID = req.params.id;

    const messages = await Messages.findById(messageID);

    if (!messages) {
        return next(new ErrorHandler("Nem található ez az üzenet"), 404);
    } 

    req.body.is_replied = true;

    console.log(req.body.reply_message)

    await sendEmail({
        email: messages.email,
        subject: "Válasz a húsház villány részéről",
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
                <h2 class="title">Válasz a húsház villány részéről</h2>
                <p class="message2">${req.body.reply_message} </p>
                <p class="message3">Ha további kérdése lenne felénk, akkor nyugodtan válaszoljon erre az e-mailre és segítünk a továbbiakban.</p>
                </div>
            </div>
            </body>
            </html>
                    `,

    });

    reply = await Messages.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    console.log(reply)

    res.status(200).json({
        success: true,
        message: "Sikeresen válaszoltál az üzenetre",
    })
})

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