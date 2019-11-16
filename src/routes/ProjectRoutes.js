const express = require('express');
const projectRepository = require('../repositories/ProjectRepository');
// const taskRepository = require('../repositories/TaskRepository');
const router = express.Router();
const baseUrl = '/projects';

router.get(`${baseUrl}/`, (req, res) => {
    projectRepository
        .findAll()
        .then((todos) => {
            res.json(todos);
        })
        .catch(error => console.log(error));
});

router.post(`${baseUrl}/`, (req, res) => {
    const { name } = req.body;
    projectRepository
        .create(name)
        .then((todo) => {
            res.json(todo);
        })
        .catch(error => console.log(error));
});

router.put(`${baseUrl}/:id`, (req, res) => {
    const { id } = req.params;
    const todo = { name: req.body.name };
    projectRepository
        .updateById(id, todo)
        .then(res.status(200).json([]))
        .catch(error => console.log(error));
});

router.delete(`${baseUrl}/:id`, (req, res) => {
    const { id } = req.params;
    projectRepository
        .deleteById(id)
        .then((ok) => {
            console.log(ok);
            console.log(`Deleted record with id: ${id}`);
            res.status(200).json([]);
        })
        .catch(error => console.log(error));
});

// router.post(`${baseUrk}/:id/task`), (req, res) => {
//
// });

// todo create task

module.exports = router;
