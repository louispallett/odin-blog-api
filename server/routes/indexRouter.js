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

router.get("/about", asyncHandler(async (req, res, next) => {
    const [users, articles, comments] = await Promise.all([
        User.find().exec(),
        Article.find().exec(),
        Comment.find().exec()
    ]);

    res.json(
        {
            users,
            articles,
            comments,
        }
    )
}));

router.get("/sign-in", (req, res, next) => {
    // Possibly just check if they are authenticated here? And then can redirect on the frontend
});

router.post("/sign-in", 
    // We will also need to do client-side validation but this is just in case that fails 
    body("email", "Email needs to be a valid email")
        .trim()
        // Should keep this - try to stop inserting escaped characters (or some) at client side. If that's messed with on that side
        // we can then escape it as a last resort
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
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.json({
                    error: "User not found"
                });
            } else {
                req.login(user, next); // Note that this assigns req.user to user. It is also a req, so we need a response in this line (otherwise we receive an error)
                jwt.sign({ user: user}, process.env.SECRET_KEY, { expiresIn: "10d" }, (err, token) => {
                    res.json({ token: token }); // We send this to the front end and save it in local storage
                });
            }
        })(req, res, next);
    })
);
  

// Possibly redundant
// router.get("/sign-up", (req, res, next) => {
    
// });

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ message: "Validation Failed", errors: errors.array() })
            return;
        } 
        try {                                                                                                     
            bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedpassword,
                });
                await user.save();
                res.json(user);
            });
        } catch(err) {
            return next(err);
        }
}));

module.exports = router;