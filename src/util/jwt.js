const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            '/users',
            '/login',
        ]
    });
}

module.exports = jwt;
