const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    // id: {
    //     type: ObjectId,
    // },
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
});

module.exports = taskSchema;
