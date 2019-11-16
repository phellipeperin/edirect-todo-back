const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    async create(username, name, password) {
        const user = { username, name, password };
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const item = new this.model(user);
        item.save();
        return this.auth(username, password);
    }

    findById(id) {
        return this.model.findById(id);
    }

    findOne(username) {
        return this.model.findOne(username);
    }

    auth(username, password) {
        this.findOne({ username })
            .exec((err, user) => {
                if (err) {
                    return err;
                } else if (!user) {
                    const err = new Error('User not found.');
                    err.status = 401;
                    return err;
                }

                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        return user;
                    } else {
                        return err;
                    }
                });
            });
    }
}

module.exports = new UserRepository(User);
