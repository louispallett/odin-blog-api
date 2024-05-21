const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Article = require("../models/article");
const verifyUser = require("../config/verifyUser");

exports.article_list = asyncHandler(async (req, res, next) => {
    const articles = await Article.find().sort({ date:1 }).exec();
    if (!articles) {
        res.sendStatus(404);
    }
    res.json({ articles })
});

exports.article_detail = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id)
        .populate({ path: "author", select: "username -_id" })
        .exec();
    if (!article) {
        res.sendStatus(404);
    }
    res.json({ article })
});

// Possibly redundant - I'm not certain what information we need to return to the front end for this one!
// Using templates, we would just render the page, so this probably isn't needed!
exports.new_article_get = asyncHandler(async (req, res, next) => {
    try {
        await verifyUser(req.token);
        res.json({ access: true });
    } catch (err) {
        res.sendStatus(403)
    }
});

exports.new_article_post = [
    // TODO: Update 'image_url' with image file via cloudinary - see inventory application project
    body("title")
        .trim()
        .isLength({ min: 2, max: 40 }).withMessage("Title must be between 2 and 50 characters in length")
        .escape(),
    body("content")
        .trim()
        .isLength({ min: 200, max: 5000 }).withMessage("Content must be between 200 and 5000 characters in length")
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ message: "Validation Error", errors: errors.array() });
            return;
        }
        try {
            const userData = await verifyUser(req.headers.authorization);
            const new_article = new Article({
               author: userData.user._id,
               date: new Date(),
               title: req.body.title,
               synopsis: req.body.synopsis,
               content: req.body.content,
               image_url: req.body.image_url, // We'll have to change this after
               published: false,
           });
       
           await new_article.save();
           res.json({ new_article }); // We want to return this to the frontend so we can redirect the client to the post 
        } catch (err) {
            console.log(err);
            res.sendStatus(403);
        }
    })
];

// Possibly redundant
exports.delete_article_get = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id).exec();
    if (!article) {
        res.sendStatus(404);
    }
});

exports.delete_article_post = [
    asyncHandler(async (req, res, next) => {
        try {
            await verifyUser(req.headers.authorization);
            const article = Article.findById(req.params.id).exec();
            if (!article) {
                res.sendStatus(404);
            } else {
                await Article.findByIdAndDelete(req.params.id);
                res.json(
                    {
                        acknowledged: true,
                        message: "Article deleted"
                    }
                )
            }
        } catch (err) {
            res.sendStatus(err);
        }
    })
];

