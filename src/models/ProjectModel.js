const mongoose = require('mongoose');
const model = require('./schemas/ProjectSchema');

module.exports = mongoose.model('Project', model);
