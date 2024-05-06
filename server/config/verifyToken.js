/* NOTE: all this middleware does is SET req.token to the header token. It does NOT check whether the user has a 
VALID token. It simply gets the token (if stored in header) and sets it to req.token. We use verifyUser() to actually
check the token is valid */

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

module.exports = verifyToken;