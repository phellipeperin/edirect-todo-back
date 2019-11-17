const Project = require('../models/ProjectModel');
const Task = require('../models/TaskModel');

class ProjectRepository { // TODO create a BaseRepository

    constructor(model) {
        this.model = model;
    }

    create(name, userId) {
        const item = new this.model({ name, userId });
        return item.save();
    }

    findAll(userId) {
        return this.model.find({ userId });
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

    async addTask(id, taskName) {
        await this.model.update(
            { _id: id },
            { $push: { taskList: new Task({ name: taskName }) } },
        );
        const project = await this.model.findById(id);
        return project.taskList[project.taskList.length - 1];
    }
}

module.exports = new ProjectRepository(Project);
