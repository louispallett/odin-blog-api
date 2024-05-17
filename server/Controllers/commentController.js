const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");
const verifyUser = require("../config/verifyUser");

exports.comment_list = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ article: req.params.articleId })
        .sort({ date:1 })
        .populate({ path: "author", select: "username -_id" })
        .exec();
    if (!comments) {
        res.json({ message: "Error fetching data" });
    }
    res.json({ comments });
});

exports.comment_detail = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();
    if (!comment) {
        res.sendStatus(404);
    }
    res.json({ comment });
});

exports.new_comment_get = asyncHandler(async (req, res, next) => {
    try {
        await verifyUser(req.token);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(403)
    }
});

exports.new_comment_post = [
    body("content", "Content contains invalid characters (<, >, `, or \")")
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ message: "Validation Failed", errors: errors.array() })
            return;
        }
        try {
            const userData = await verifyUser(req.token);
            const new_comment = new Comment({
                article: req.params.articleId,
                author: userData.user._id,
                content: req.body.content,
                date: new Date(),
                likes: 0
            });
            await new_comment.save();
            res.json({ new_comment });
        } catch (err) {
            res.sendStatus(403);
        }
    })
];

// Possibly redundant
exports.delete_get = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();
    if (!comment) {
        res.sendStatus(404);
    }
    next();
});

exports.delete_post = asyncHandler(async (req, res, next) => {
        try {
            await verifyUser(req.token);
            const comment = await Comment.findById(req.params.id).exec();
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
});

