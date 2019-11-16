const Task = require('../models/Task');

class TaskRepository {

    constructor(model) {
        this.model = model;
    }

    create(name) {
        const item = new this.model({ name, done: false });
        return item.save();
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
