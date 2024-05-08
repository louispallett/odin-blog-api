const asyncHandler = require("express-async-handler");

const Article = require("../models/article");
const verifyUser = require("../config/verifyUser");

exports.article_list = asyncHandler(async (req, res, next) => {
    const articles = await Article.find().sort({ date:1 }).exec();
    res.json(
        {
            articles
        }
    )
});

exports.article_detail = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id).exec();
    res.json(
        {
            article
        }
    )
});

// Possibly redundant - I'm not certain what information we need to return to the front end for this one!
// Using templates, we would just render the page, so this probably isn't needed!
exports.new_article_get = asyncHandler(async (req, res, next) => {

});

exports.new_article_post = [
    // TODO: Add validation
    // TODO: Error handle
    asyncHandler(async (req, res, next) => {
        try {
            const userData = await verifyUser(req.token);
            const new_article = new Article({
               author: userData.user._id,
               date: new Date(),
               title: req.body.article_title,
               content: req.body.article_content,
               image_url: req.body.image_url, // We'll have to change this after
           });
           // TODO: Handler validation errors here
       
           await new_article.save();
           res.json({ new_article }); // We want to return this to the frontend so we can redirect the client to the post 
        } catch (err) {
            res.sendStatus(403);
        }
    })
];

// Possibly redundant
exports.delete_article_get = asyncHandler(async (req, res, next) => {

});

exports.delete_article_post = [
    // TODO: Error handle
    asyncHandler(async (req, res, next) => {
        try {
            await verifyUser(req.token);
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

