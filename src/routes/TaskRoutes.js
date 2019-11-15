const express = require('express');
const todoRepository = require('../repositories/TaskRepository');
const router = express.Router();
const baseUrl = '/task';

router.get(`${baseUrl}/`, (req, res) => {
    todoRepository.findAll().then((todos) => {
        res.json(todos);
    }).catch((error) => console.log(error));
});

router.post(`${baseUrl}/`, (req, res) => {
    const { name } = req.body;
    todoRepository.create(name).then((todo) => {
        res.json(todo);
    }).catch((error) => console.log(error));
});

router.put(`${baseUrl}/:id`, (req, res) => {
    const { id } = req.params;
    const todo = { name: req.body.name, done: req.body.done };
    todoRepository.updateById(id, todo)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});

router.delete(`${baseUrl}/:id`, (req, res) => {
    const { id } = req.params;
    todoRepository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

module.exports = router;
