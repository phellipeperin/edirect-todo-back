const User = require('../models/User');

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    create(username, name, password) {
        const item = new this.model({ username, name, password });
        return item.save();
    }

    findById(id) {
        return this.model.findById(id);
    }

}

module.exports = new UserRepository(User);
