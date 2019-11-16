const mongoose = require('mongoose');
const model = require('./schemas/UserSchema');

module.exports = mongoose.model('Task', model);
