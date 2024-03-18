const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = process.env.PORT || 5000

// MONGODB Connect
mongoose.connect(process.env.MONGO_DB_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

