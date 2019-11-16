const Project = require('../models/ProjectModel');

class ProjectRepository { // TODO create a BaseRepository

    constructor(model) {
        this.model = model;
    }

    create(name) {
        const item = new this.model({ name });
        return item.save();
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
