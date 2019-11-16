const mongoose = require('mongoose');
const model = require('./schemas/SessionSchema');

module.exports = mongoose.model('Session', model);
