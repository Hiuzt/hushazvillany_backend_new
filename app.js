const express = require("express");
const app = express();
const cors = require('cors');

const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://hushazvillany.vercel.app",
    credentials: true,
}));
app.use(express.static("public"))

// Import all routes
const apiRoute = "/api/";

const users = require("./routes/users");
const auth = require("./routes/auth");
const product = require("./routes/product");
const messages = require("./routes/message");

app.use(apiRoute, users);
app.use(apiRoute, auth);
app.use(apiRoute, product);
app.use(apiRoute, messages);



// Error handling middleware
app.use(errorMiddleware);

module.exports = app;