const mongoose = require('mongoose');
const { Schema } = mongoose;
const taskSchema = require('./TaskSchema');

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: false,
        required: true,
    },
    taskList: [taskSchema],
});

module.exports = projectSchema;
