const express = require('express');
const taskRepository = require('../repositories/TaskRepository');
const auth = require('../middleware/auth');
const router = express.Router();
const baseUrl = '/task';

router.put(`${baseUrl}/:id`, auth, (req, res) => {
    const { id } = req.params;
    const task = { name: req.body.name, done: req.body.done };
    taskRepository
        .updateById(id, task)
        .then(res.status(200).json([]))
        .catch(error => res.status(400).send(error));
});

router.delete(`${baseUrl}/:id`, auth, (req, res) => {
    const { id } = req.params;
    taskRepository
        .deleteById(id)
        .then(ok => res.status(200).json([]))
        .catch(error => res.status(400).send(error));
});

module.exports = router;
