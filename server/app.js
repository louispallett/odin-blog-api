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

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'"],
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

app.get("/*", (req, res, next) => {
    res.sendFile(
        path.join(__dirname, "../client/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.use("/api", indexRouter);
app.use("/api/writers", writerRouter);
app.use("/api/articles", articlesRouter);
// See commentsRouter.js - we MUST use mergeParams: true in order to use parameters across files
app.use("/api/articles/:articleId/comments", commentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));