const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken")
const passport = require("../config/passport");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const Article = require("../models/article");
const Comment = require("../models/comment");
const verifyUser = require("../config/verifyUser");

require('dotenv').config();

router.get("/about", asyncHandler(async (req, res, next) => {
    const [users, articles, comments] = await Promise.all([
        User.find().exec(),
        Article.find().exec(),
        Comment.find().exec()
    ]);

    res.json(
        {
            users: users.length,
            articles: articles.filter(item => item.published).length,
            comments: comments.length,
        }
    )
}));

router.post("/sign-in", 
    body("email", "Email needs to be a valid email")
        .trim()
        .escape()
        .isEmail(),
    body("password")
        .trim(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ message: "Validation Failed", errors: errors.array() })
            return;
        } 
        // To see full information on passport.authenticate, check out the docs here (https://github.com/russl8/BeGrate)
        passport.authenticate("user_local", (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.json({
                    error: "User not found"
                });
            } else {
                req.login(user, next); // Note that this assigns req.user to user. It is also a req, so we need a response in this line (otherwise we receive an error)
                jwt.sign({ user: user }, process.env.USER_KEY, { expiresIn: "10d" }, (err, token) => {
                    res.json({ token: token }); // We send this to the front end and save it in local storage
                });
            }
        })(req, res, next);
    })
);
  

router.get("/verify", asyncHandler(async (req, res, next) => {
    try {
        await verifyUser(req.headers.authorization);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(403)
    }
}));

// Note that when you POST on postman under "raw" you need to select the type to JSON
router.post("/sign-up", 
    // We will also need to do client-side validation but this is just in case that fails 
    body("email")
        .trim()
        .isEmail().withMessage("Email needs to be a valid email")
        .escape(),
    body("password")
        .trim(),

    asyncHandler(async (req, res, next) => {
        const userExists = await User.findOne({ email: req.body.email.toLowerCase() }, "email").exec();
        if (userExists) {
            res.json({ errors: "Email already used for another account!" })
            return;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ message: "Validation Failed", errors: errors.array() })
            return;
        } 
        try {                                                                                                     
            bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
                if (err) {
                    console.log(err);
                }
                const user = new User({
                    username: req.body.username,
                    email: req.body.email.toLowerCase(),
                    password: hashedpassword,
                });
                await user.save();
                res.json({ id: user._id });
            });
        } catch(err) {
            return next(err);
        }
}));

module.exports = router;