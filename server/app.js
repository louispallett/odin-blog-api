const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const commentsRouter = require("./routes/commentsRouter");
const postsRouter = require("./routes/postsRouter");

require('dotenv').config();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const app = express();

app.get("/api", (req, res, next) => {
    res.json(
        {
            message: "Welcome to the API",
        }
    );
});

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));