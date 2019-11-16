const Project = require('../models/Project');

class ProjectRepository {

    constructor(model) {
        this.model = model;
    }

    create(name) {
        const newTask = { name };
        const todo = new this.model(newTask);

        return todo.save();
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }

    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    updateById(id, object) {
        const query = { _id: id };
        return this.model.findOneAndUpdate(query, { $set: { name: object.name } });
    }
}

module.exports = new ProjectRepository(Project);
