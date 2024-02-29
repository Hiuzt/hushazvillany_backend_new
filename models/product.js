const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Kérlek adj meg egy termék nevet"],
        trim: true,
        maxLength: 100
    },

    price: {
        type: Number,
        required: [true, "Kérlek ajd meg egy árat"]
    },

    description: {
        type: String,
        rquired: [true, "Kérlek add meg a termék leírását"],
        maxLength: 200
    },
    
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    category: {
        type: String,
        required: [true, "Kérlek válaszd ki a termék kategóriáját"]
    },

    image: {
        type: String,
        default: "default.jpg"
    }
})

module.exports = mongoose.model("Product", productSchema);