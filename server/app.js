bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const path = require("path");
const passport = require("passport");
const session = require("express-session");

const indexRouter = require("./routes/indexRouter");
const commentsRouter = require("./routes/commentsRouter");
const articlesRouter = require("./routes/articlesRouter");

require('dotenv').config();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))
// app.use(cors({
//     // TODO: At production add our frontend
// }))

require("./config/passport.js");

app.use(passport.initialize());
app.use(passport.session());


// Temp: for dev
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});  

app.use("/", indexRouter);
app.use("/comments", commentsRouter);
app.use("/articles", articlesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));