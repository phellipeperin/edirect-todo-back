const express = require('express');
const userRepository = require('../repositories/UserRepository');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userRepository
        .auth(username, password)
        .then(result => res.json(result)) // todo return token
        .catch(error => console.log(error));
});

module.exports = router;
