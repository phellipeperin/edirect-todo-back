const express = require('express');
const userRepository = require('../repositories/UserRepository');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/users/', (req, res) => {
    const { username, name, password } = req.body;
    userRepository
        .create(username, name, password)
        .then(result => res.json(result))
        .catch(error => res.status(400).send(error));
});

router.get('/profile/', auth, (req, res) => {
    userRepository
        .findBySessionKey(req.token)
        .then(result => res.json(result))
        .catch(error => res.status(401).send(error));
});

module.exports = router;
