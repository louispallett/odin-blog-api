const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        image_url: { type: String },
        date: { type: Date, required: true },
    }
)