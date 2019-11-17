const express = require('express');
const userRepository = require('../repositories/UserRepository');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userRepository
        .auth(username, password)
        .then(result => res.json(result))
        .catch(error => res.status(400).send(error));
});

router.post('/logout', auth, (req, res) => {
    userRepository
        .logout(req.token)
        .then(result => res.json(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;
