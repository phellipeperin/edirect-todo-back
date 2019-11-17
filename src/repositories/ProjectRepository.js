const Project = require('../models/ProjectModel');
const Task = require('../models/TaskModel');

class ProjectRepository { // TODO create a BaseRepository

    constructor(model) {
        this.model = model;
    }

    // Project
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
        return this.model.findOneAndUpdate({ _id: id }, { $set: { name: object.name } });
    }

    // Task
    async addTask(projectId, taskName) {
        await this.model.update(
            { _id: projectId },
            { $push: { taskList: new Task({ name: taskName }) } },
        );
        const project = await this.model.findById(projectId);
        return project.taskList[project.taskList.length - 1];
    }

    deleteTaskById(projectId, taskId) {
        return this.model.findByIdAndUpdate(projectId, { $pull: { taskList: { _id: taskId, done: false } } });
    }

    updateTaskName(projectId, taskId, taskName) {
        return this.model.findOneAndUpdate({ _id: projectId, 'taskList._id': taskId }, { $set: {'taskList.$.name': taskName } });
    }

    updateTaskStatus(projectId, taskId, done) {
        const doneAt = done ? new Date() : null;
        return this.model.findOneAndUpdate({ _id: projectId, 'taskList._id': taskId }, { $set: {'taskList.$.done': done, 'taskList.$.doneAt': doneAt } });
    }
}

module.exports = new ProjectRepository(Project);
