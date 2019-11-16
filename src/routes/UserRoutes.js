const express = require('express');
const userRepository = require('../repositories/UserRepository');
const router = express.Router();
const baseUrl = '/users';

router.post(`${baseUrl}/`, (req, res) => {
    const { username, name, password } = req.body;
    // TODO encrypt
    userRepository
        .create(name)
        .then(result => res.json(result))
        .catch(error => console.log(error));
});

module.exports = router;
