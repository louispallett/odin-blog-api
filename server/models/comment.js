const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const Comment = new Schema(
    {
        // I've placed this as a String here. This is just used to find the comments by this value (taken from the params).
        // Therefore, it doesn't need to be populated etc.
        article: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        date: { type: Date, required: true },
    }
)

Comment.virtual("date_formatted").get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

// Since we are passing the data back to the client, we need to ensure it's passing JSON. We do this with the following command below:
Comment.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Comment", Comment)