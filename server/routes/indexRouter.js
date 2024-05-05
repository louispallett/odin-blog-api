const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const asyncHandler = require("express-async-handler");

const User = require("../models/user");

router.get("/", (req, res, next) => {
    res.redirect("/sign-in");
});

router.get("/sign-in", (req, res, next) => {
    // Possibly just check if they are authenticated here? And then can redirect on the frontend
});

router.post("/sign-in", passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/sign-in"
}));
  

router.get("/sign-up", (req, res, next) => {
    
});

router.post("/sign-up", asyncHandler(async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
          const user = new User({
            username: req.body.username,
            password: hashedpassword,
          });
          await user.save();
        });
    } catch(err) {
        return next(err);
    }
}));

module.exports = router;