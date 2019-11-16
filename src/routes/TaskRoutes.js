const express = require('express');
const taskRepository = require('../repositories/TaskRepository');
const router = express.Router();
const baseUrl = '/task';

router.put(`${baseUrl}/:id`, (req, res) => {
    const { id } = req.params;
    const task = { name: req.body.name, done: req.body.done };
    taskRepository
        .updateById(id, task)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});

router.delete(`${baseUrl}/:id`, (req, res) => {
    const { id } = req.params;
    taskRepository
        .deleteById(id)
        .then((ok) => {
            console.log(ok);
            console.log(`Deleted record with id: ${id}`);
            res.status(200).json([]);
        })
        .catch(error => console.log(error));
});

module.exports = router;
