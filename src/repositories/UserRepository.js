const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Session = require('../models/SessionModel');
const config = require('../config/config.js');

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    async create(username, name, password) {
        let user = { username, name, password };
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const item = new this.model(user);
        user = await item.save();

        const newSessionKey = jwt.sign({ _id: user._id }, config.SECRET_KEY);
        const newSession = new Session({ key: newSessionKey, userId: user._id });
        await newSession.save();
        return newSessionKey;
    }

    findById(id) {
        return this.model.findById(id);
    }

    findOne(username) {
        return this.model.findOne(username);
    }

    async findBySessionKey(key) {
        const session = await Session.findOne({ key });
        if (session) {
            return this.findById(session.userId);
        }
        return new Promise((resolve, reject) => {
            reject('Invalid session');
        });
    }

    async auth(username, password) {
        const user = await this.findOne({ username });
        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const oldSession = await Session.findOne({ userId: user._id });
                if (oldSession) {
                    await Session.findByIdAndDelete(oldSession._id);
                }
                const newSessionKey = jwt.sign({ _id: user._id }, config.SECRET_KEY);
                const newSession = new Session({ key: newSessionKey, userId: user._id });
                await newSession.save();
                return newSessionKey;
            }
        }
        return new Promise((resolve, reject) => {
            reject('Invalid credentials');
        });
    }

    async logout(sessionKey) {
        return Session.findOneAndDelete({ key: sessionKey });
    }
}

module.exports = new UserRepository(User);
