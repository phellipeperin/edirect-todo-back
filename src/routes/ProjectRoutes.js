const express = require('express');
const projectRepository = require('../repositories/ProjectRepository');
// const taskRepository = require('../repositories/TaskRepository');
const auth = require('../middleware/auth');
const router = express.Router();
const baseUrl = '/projects';

router.get(`${baseUrl}/`, auth, (req, res) => {
    projectRepository
        .findAll(req.user._id)
        .then(result => res.json(result))
        .catch(error => res.status(400).send(error));
});

router.post(`${baseUrl}/`, auth, (req, res) => {
    const { name } = req.body;
    projectRepository
        .create(name, req.user._id)
        .then(result => res.json(result))
        .catch(error => res.status(400).send(error));
});

router.put(`${baseUrl}/:id`, auth, (req, res) => {
    const { id } = req.params;
    const todo = { name: req.body.name };
    projectRepository
        .updateById(id, todo)
        .then(res.status(200).json([]))
        .catch(error => res.status(400).send(error));
});

router.delete(`${baseUrl}/:id`, auth, (req, res) => {
    const { id } = req.params;
    projectRepository
        .deleteById(id)
        .then(ok => res.status(200).json([]))
        .catch(error => res.status(400).send(error));
});

router.post(`${baseUrl}/:id/task`, auth, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    projectRepository
        .addTask(id, name)
        .then(result => res.json(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;
