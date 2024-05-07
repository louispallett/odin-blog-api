const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        image_url: { type: String },
        date: { type: Date, required: true },
    }
);

module.exports = mongoose.model("Article", Post);