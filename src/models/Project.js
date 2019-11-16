const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Project', projectSchema);
