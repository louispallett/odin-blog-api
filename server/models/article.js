const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const Article = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "Writer", required: true },
        title: { type: String, required: true },
        synopsis: { type: String, required: true },
        content: { type: String, required: true },
        date: { type: Date, required: true },
        published: { type: Boolean, required: true },
        image_url: { type: String },
        cloudinary_id: { type: String },
    }
);

Article.virtual("date_formatted").get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

Article.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Article", Article);