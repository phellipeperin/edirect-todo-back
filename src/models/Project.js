const mongoose = require('mongoose');
const { Schema } = mongoose;
const taskSchema = require('./Task');

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    taskList: [taskSchema],
});

module.exports = mongoose.model('Project', projectSchema);
