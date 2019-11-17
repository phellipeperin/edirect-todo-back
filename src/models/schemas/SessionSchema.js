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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: false,
        required: true,
    },
});

module.exports = sessionSchema;
