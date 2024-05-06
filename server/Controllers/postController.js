const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const verifyUser = require("../config/verifyUser");

exports.post_list = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().sort({ date:1 }).exec();
    res.json(
        {
            posts: posts
        }
    )
});

exports.post_detail = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    res.json(
        {
            post: post
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
           const new_post = new Post({
               author: userData.user._id,
               date: new Date(),
               title: req.body.article_title,
               content: req.body.article_content,
               image_url: req.body.image_url, // We'll have to change this after
           });
           // TODO: Handler validation errors here
       
           await new_post.save();
           res.json({ new_post: new_post }); // We want to return this to the frontend so we can redirect the client to the post 
        } catch (err) {
            res.sendStatus(err);
        }
    })
];

// Possibly redundant
exports.delete_get = asyncHandler(async (req, res, next) => {

});

exports.delete_post = [
    asyncHandler(async (req, res, next) => {
        try {
            const userData = await verifyUser(req.token);
            const new_post = new Post({
                author: userData.user._id,
                date: new Date(),
                title: req.body.article_title,
                content: req.body.article_content,
                image_url: req.body.image_url, // We'll have to change this after
            });
            // TODO: Handler validation errors here
       
            await new_post.save();
            res.json({ new_post: new_post }); // We want to return this to the frontend so we can redirect the client to the post 
        } catch (err) {
            res.sendStatus(err);
        }
    })
];

