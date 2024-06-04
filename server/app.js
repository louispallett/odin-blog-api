bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require('cookie-parser');
const express = require("express");
const helmet = require("helmet")
const mongoose = require("mongoose");
const logger = require('morgan');
const path = require("path");
const passport = require("passport");
const RateLimit = require("express-rate-limit");
const session = require("express-session");

const indexRouter = require("./routes/indexRouter");
const commentsRouter = require("./routes/commentsRouter");
const articlesRouter = require("./routes/articlesRouter");
const writerRouter = require("./routes/writerRouter.js");

require('dotenv').config();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// Note that the limiter limits requests from each IP address - not over all requests
const limiter = RateLimit({
    windowMs: 1 *  60 * 1000,
    max: 75,
  });  

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'", "https://son-server.fly.dev/favicon.ico"],
            "script-src": ["'self'", "'unsafe-inline'", "'res.cloudinary.com'"],
            "img-src": ["'self'", "*.cloudinary.com", "https://son-server.fly.dev/favicon.ico"]
        },
    }),
);
app.use(logger('dev'));
app.use(limiter);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

require("./config/passport.js");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);
app.use("/api/writers", writerRouter);
app.use("/api/articles", articlesRouter);
// See commentsRouter.js - we MUST use mergeParams: true in order to use parameters across files
app.use("/api/articles/:articleId/comments", commentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));