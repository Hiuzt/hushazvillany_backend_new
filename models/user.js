const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Kérlek adj meg egy nevet"],
        maxLength: 100
    },

    username: {
        type: String,
        required: [true, "Kérlek adj meg egy felhasználónevet"],
        trim: true,
        maxLength: 100
    },

    password: {
        type: String,
        required: [true, "Kérlek adj meg egy jelszót"],
        minlength: [8, "A jelszónak minimum 8 karakterből kell állnia"],
        select: false
    },

    email: {
        type: String,
        required: [true, "Kérlek adj meg egy E-mail címet"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJwtToken = function() {
    return jwt.sign( {id: this._id, name: this.name, email: this.email}, process.env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = mongoose.model("User", userSchema);