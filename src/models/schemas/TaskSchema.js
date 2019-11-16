const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    // id: {
    //     type: ObjectId,
    // },
    name: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    doneAt: {
        type: Date,
    },
});

module.exports = taskSchema;
