"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const crypto = require("crypto");
const async = require("async");
const jwt = require("jsonwebtoken");
const UserRepository = require("../../repository/user/UserRepository");
class UserBusiness {
    constructor() {
        this.saltLength = parseInt(process.env.SALT_LENGTH);
        this._UserRepository = new UserRepository();
    }
    /**
     * @function create
     * @description Create a User
     * @param user
     * @param callback
     * @author Udayaditya Singh
     */
    create(user, callback) {
        const hash = this.saltHashPassword(user.password);
        user.isVerified = true;
        user.balance = 100;
        user.password = hash.password;
        user.salt = hash.salt;
        this._UserRepository.create(user, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function retrieve
     * @description Retrieve all Users
     * @param callback
     * @author Udayaditya Singh
     */
    retrieve(callback) {
        this._UserRepository.retrieve((err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function delete a user
     * @description Delete a User
     * @param _id
     * @param callback
     * @author Udayaditya Singh
     */
    delete(_id, callback) {
        this._UserRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function update
     * @description Update a User
     * @param _id
     * @param item
     * @param callback
     * @author Udayaditya Singh
     */
    update(_id, item, callback) {
        this._UserRepository.update(_id, item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function findById
     * @description find user by id
     * @param id
     * @param callback
     * @author Udayaditya Singh
     */
    findById(_id, callback) {
        this._UserRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function saltHashPassword
     * @description get Ihash Data
     * @param password
     * @author Udayaditya Singh
     */
    saltHashPassword(password) {
        const salt = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    }
    /**
     * @function getSalt
     * @description get salt
     * @author Udayaditya Singh
     */
    getSalt() {
        return crypto.randomBytes(this.saltLength).toString('hex');
    }
    /**
     * @function hashPasswordWithSalt
     * @description Hashed the password
     * @param password
     * @param salt
     * @author Udayaditya Singh
     */
    hashPasswordWithSalt(password, salt) {
        let hashedPassword = crypto.createHmac('sha512', salt);
        hashedPassword.update(password);
        hashedPassword = hashedPassword.digest('hex');
        const encryptedValues = {
            salt: salt,
            password: String(hashedPassword)
        };
        return encryptedValues;
    }
    /**
     * @function login
     * @description login a user
     * @param email
     * @param password
     * @param callback
     * @author Udayaditya Singh
     */
    login(email, password, callback) {
        async.waterfall([
            (done) => {
                this._UserRepository.findByItem({ email }, (error, result) => {
                    error ? done(error, null) : null;
                    if (result && result.isVerified) {
                        const userPassword = this.hashPasswordWithSalt(password, result.salt);
                        if (result.password === userPassword.password) {
                            const payload = { _id: result._id };
                            const options = { expiresIn: '1d', issuer: 'techverito' };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            const userDetail = {
                                _id: result._id,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                email: result.email,
                                password: result.password,
                                salt: result.salt,
                                token: token
                            };
                            return done(null, userDetail);
                        }
                        else {
                            return done('Wrong Password', null);
                        }
                    }
                    else if (result && !result.isVerified) {
                        done('User not verified', null);
                    }
                    else {
                        return done("User not found", null);
                    }
                });
            },
            (userDetail, done) => {
                this._UserRepository.update(userDetail._id, userDetail, (error, result) => {
                    error ? done('Internal Server Error', null) : done(null, userDetail.token);
                });
            }
        ], (err, result) => {
            err ? callback(err, null) : callback(null, result);
        });
    }
    findByToken(token, callback) {
        this._UserRepository.findByItem({ token }, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    getUserDetails(user) {
        const { _doc } = user, rest = __rest(user, ["_doc"]);
        const { password, salt, token } = _doc, data = __rest(_doc, ["password", "salt", "token"]);
        return data;
    }
    addMoney(amount, userId, callback) {
        async.waterfall([
            (done) => {
                this._UserRepository.findByItem({ "_id": userId }, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('User not found', null);
                });
            },
            (user, done) => {
                user.balance = user.balance + amount;
                this._UserRepository.update(userId, { "balance": user.balance }, (err, res) => {
                    err ? done(err, null) : done(null, res);
                });
            }
        ], (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    logout(userId, callback) {
        const updateItem = { $unset: { token: 1 } };
        this._UserRepository.logout(userId, updateItem, (err, resp) => {
            err ? callback(err, null) : callback(null, resp);
        });
    }
    addPlanByUser(userId, planId, callback) {
        this._UserRepository.checkBalance(userId, planId, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    addChannelByUser(userId, channelId, callback) {
        this._UserRepository.addChannelByUser(userId, channelId, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
}
Object.seal(UserBusiness);
module.exports = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map