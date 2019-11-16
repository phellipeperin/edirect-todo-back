const expressJwt = require('express-jwt');
const config = require('../config/config.js');

function jwt() {
    const secret = config.SECRET_KEY;
    return expressJwt({ secret }).unless({
        path: [
            '/api/users',
            '/api/login',
        ]
    });
}

module.exports = jwt;
