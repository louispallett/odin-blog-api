const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyWriter(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.WRITER_KEY, (err, authData) => {
            if (err) {
                reject(403); 
            } else {
                resolve(authData); 
            }
        });
    });
}

module.exports = verifyWriter;
