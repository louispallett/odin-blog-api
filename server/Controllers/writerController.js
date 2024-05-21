const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const passport = require("../config/passport_writer");
const { body, validationResult } = require("express-validator");

require('dotenv').config();

const Writer = require("../models/writer");
const verifyWriter = require("../config/verifyWriter");

exports.writer_sign_up = [
    body("email")
        .trim()
        .isEmail().withMessage("Email needs to be a valid email")
        .escape(),
    body("passkey")
        .equals(process.env.WRITER_PASS).withMessage("Invalid Pass Key"),
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
                if (err) {
                    console.log(err);
                }
                const user = new Writer({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedpassword,
                    writer: false,
                });
                await user.save();
                res.json(user);
            });
        } catch(err) {
            return next(err);
        }
    })
]

exports.writer_sign_in = [
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
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.json({
                    error: "User not found"
                });
            } else {
                req.login(user, next);
                jwt.sign({ user: user }, process.env.WRITER_KEY, { expiresIn: "10d" }, (err, token) => {
                    res.json({ token: token });
                });
            }
        })(req, res, next);
    })
]

exports.verify_writer = asyncHandler(async (req, res, next) => {
    try {
        const response = await verifyWriter(req.headers.authorization);
        if (response.user.writer) {
            res.sendStatus(403)
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(403)
    }
});