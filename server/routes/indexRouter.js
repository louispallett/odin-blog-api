const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

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

router.post("/sign-up", (req, res, next) => {
    
});

module.exports = router;