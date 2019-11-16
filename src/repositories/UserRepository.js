const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/UserModel');
const Session = require('../models/SessionModel');

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

    async auth(username, password) {
        const user = await this.findOne({ username });
        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const oldSession = await Session.findOne({ userId: user._id });
                if (oldSession) {
                    Session.findByIdAndDelete(oldSession._id);
                }
                const newSessionKey = crypto.randomBytes(16).toString('base64');
                const newSession = new Session({ key: newSessionKey, userId: user._id });
                await newSession.save();
                return newSessionKey;
            }
        }
        return; // TODO return an error
    }
}

module.exports = new UserRepository(User);
