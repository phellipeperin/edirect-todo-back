const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const UserRepository = require('../repositories/UserRepository');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const data = jwt.verify(token, config.SECRET_KEY);
        const user = await UserRepository.findBySessionKey(token);
        if (!user) throw new Error();

        req.user = { username: user.username, name: user.name };
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized' });
    }
};

module.exports = auth;
