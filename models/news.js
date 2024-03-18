const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Nem adtál meg semmilyen címet sem"],
    },

    text: {
        type: String,
        required: [true, "Nem adtál meg szöveget a hírhez!"],

    },

    image: {
        type: String,
        default: "default.jpg"
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("news", newsSchema)