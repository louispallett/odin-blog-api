const jwt = require("jsonwebtoken");

/* This is just our verification method to ensure that the token is correct.
Simply, we can pass this as a middleware when calling get/post/put/delete requests, to 
ensure only authorized users do this! */

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = verifyToken();