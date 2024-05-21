const jwt = require('jsonwebtoken');
require('dotenv').config();

/*  
jwt.verify takes the token and "decrypts" it to return the data about our user (this is 'authData'). 
We then use this as we like in the creation of the post.

The authData returns all we have stored about the user (username, email, password(hashed version)). But it also 
returns the iat (creation time) and expires time.

NOTE: This function verifies that the token itself is valid. It ALSO returns user data is there is NO error.
*/

async function verifyUser(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.USER_KEY, (err, authData) => {
            if (err) {
                reject(403); 
            } else {
                resolve(authData); 
            }
        });
    });
}

module.exports = verifyUser;
