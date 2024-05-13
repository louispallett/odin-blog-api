const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        synopsis: { type: String, required: true },
        content: { type: String, required: true },
        image_url: { type: String }, // If this isn't provided, we can put in a 'placeholder' image
        date: { type: Date, required: true },
    }
);

module.exports = mongoose.model("Article", Article);