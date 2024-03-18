const express = require("express");
const app = express();
const cors = require('cors');

const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: "https://hushazvillany.vercel.app",
    origin: "http://localhost:4200",
    credentials: true,
}));
app.use(express.static("public"))

// Import all routes
const apiRoute = "/api/";

const users = require("./routes/users");
const auth = require("./routes/auth");
const product = require("./routes/product");
const messages = require("./routes/message");
const news = require("./routes/news");

app.use(apiRoute, users);
app.use(apiRoute, auth);
app.use(apiRoute, product);
app.use(apiRoute, messages);
app.use(apiRoute, news);



// Error handling middleware
app.use(errorMiddleware);

module.exports = app;