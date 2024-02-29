const nodeMailer = require("nodemailer");

exports.sendEmail = async options => {
    const transport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false // Disable SSL certificate verification
        }
    });

    console.log(options.email)

    const mailOptions = {
        from: 'kernerzoltan12@gmail.com',
        to: options.email,
        subject: options.subject,
        html: options.message
    };
    
    
    transport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("Error occurred:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}