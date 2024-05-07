const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        date: { type: Date, required: true },
        likes: { type: Number, required: true },
    }
)

Comment.virtual("date_formatted").get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("Comment", Comment)