const asyncHandler = require("express-async-handler");

const Comment = require("../models/comment");
const verifyUser = require("../config/verifyUser");

exports.comment_list = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ article: req.params.articleId }).sort({ date:1 }).exec();
    // const comments = await Comment.find({ article: req.params.articleId }).exec();
    res.json({ comments });
});

exports.comment_detail = asyncHandler(async (req, res, next) => {
    await verifyUser(req.token);
    const comment = await Comment.findById("663beba11798c3c2d59dbf7f").exec();
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
                article: req.params.articleId,
                author: userData.user._id,
                content: req.body.content,
                date: new Date(),
                likes: 0
            });
            // TODO: Handle validation errors
            await new_comment.save();
            res.json({ new_comment });
        } catch (err) {
            res.sendStatus(403);
        }
    })
];

// Possibly redundant
exports.delete_get = asyncHandler(async (req, res, next) => {

});

exports.delete_post = [
    // TODO: Error handle
    asyncHandler(async (req, res, next) => {
        try {
            await verifyUser(req.token);
            const comment = Comment.findById(req.params.id).exec();
            if (!comment) {
                res.sendStatus(404);
            } else {
                await Comment.findByIdAndDelete(req.params.id);
                res.json(
                    {
                        acknowledged: true,
                        message: "Comment deleted"
                    }
                )
            }
        } catch (err) {
            res.sendStatus(err);
        }
    })

];

