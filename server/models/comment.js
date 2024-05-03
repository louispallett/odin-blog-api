const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        date: { type: Date, required: true },
    }
)