const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken")
const passport = require("../config/passport");
const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res, next) => {
    res.redirect("/sign-in");
});

router.get("/sign-in", (req, res, next) => {
    // Possibly just check if they are authenticated here? And then can redirect on the frontend
});

router.post("/sign-in", 
    // TODO: Backend validation
    // TODO: Error handling

    asyncHandler(async (req, res, next) => {
        // To see full information on passport.authenticate, check out the docs here (https://github.com/russl8/BeGrate)
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.json({
                    error: "User not found"
                });
            } else {
                req.login(user, next); // Note that this assigns req.user to user. It is also a req, so we need a response in this line (otherwise we receive an error)
                jwt.sign({ user: user}, process.env.SECRET_KEY, { expiresIn: "10h" }, (err, token) => {
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
// TODO: Backend validation
// TODO: Error handling
    asyncHandler(async (req, res, next) => {
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