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
    // passport.authenticate("local", {
    //     successRedirect: "/users/dashboard",
    //     failureRedirect: "/users/sign-in"
    //     }), 
    (req, res, next) => {
        // Mock user
        const user = {
            id: 1,
            username: "lowpal",
            email: "lowpal@lowpal.com"
        }
        jwt.sign({ user: user }, "secretKey", { expiresIn: "10h" }, (err, token) => {
            res.json(
                {
                    token: token
                }
            )
        })
    }
);
  

router.get("/sign-up", (req, res, next) => {
    
});

// Note that when you POST on postman under "raw" you need to select the type to JSON
router.post("/sign-up", asyncHandler(async (req, res, next) => {
    // TODO: Backend validation
    // TODO: Error handling
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