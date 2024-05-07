const asyncHandler = require("express-async-handler");

const Comment = require("../models/comment");
const verifyUser = require("../config/verifyUser");

exports.comment_list = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ article: req.params.article_id }).sort({ date:1 }).exec();
    res.json({ comments });
});

exports.comment_detail = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();
    res.json({ comment });
});

// Possibly redundant
exports.new_comment_get = asyncHandler(async (req, res, next) => {

});

exports.new_comment_post = [
    // TODO: Add validation
    // TODO: Error handle
    asyncHandler(async (req, res, next) => {
        try {
            const userData = await verifyUser(req.token);
            const new_comment = new Comment({
                post: "",
                author: userData.user._id,
                content: req.body.content,
                date: new Date(),
                likes: 0
            });
            // TODO: Handle validation errors
            await new_comment.save();
            res.json({ new_comment });
        } catch (err) {

        }
    })
];

exports.delete_get = asyncHandler(async (req, res, next) => {

});

exports.delete_post = [

];

