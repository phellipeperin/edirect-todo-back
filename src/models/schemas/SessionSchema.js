const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    key: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userId: {
        type: String, // TODO ObjectId
        required: true,
    },
});

module.exports = sessionSchema;
