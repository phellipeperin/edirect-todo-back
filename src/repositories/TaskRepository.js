const Task = require('../models/Task');

class TaskRepository {

    constructor(model) {
        this.model = model;
    }

    create(name) {
        const newTask = { name, done: false };
        const todo = new this.model(newTask);

        return todo.save();
    }

    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    updateById(id, object) {
        const query = { _id: id };
        return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done } });
    }
}

module.exports = new TaskRepository(Task);
