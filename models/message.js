const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Nem adtál meg nevet!"]
    },

    email: {
        type: String,
        required: [true, "Nem adtál meg E-mail címet"]
    },

    message_content: {
        type: String,
        required: [true, "Nem adtál meg üzenetet"]
    },

    is_replied: {
        type: Boolean,
        default: false,
    },

    reply_message: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model("Messages", MessageSchema)