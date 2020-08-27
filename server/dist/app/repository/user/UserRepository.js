"use strict";
const async = require("async");
const RepositoryBase = require("../base");
const UserSchema = require("../../dataAccess/schemas/UserSchema");
const PlanSchema = require("../../dataAccess/schemas/PlanSchema");
const ChannelSchema = require("../../dataAccess/schemas/ChannelSchema");
class UserRepository extends RepositoryBase {
    constructor() {
        super(UserSchema);
    }
    findByItem(item, callback) {
        UserSchema.findOne(item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    logout(userId, item, callback) {
        UserSchema.findOneAndUpdate({ "_id": userId }, { "$unset": { "token": 1 } }, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    checkBalance(userId, planId, callback) {
        async.waterfall([
            (done) => {
                PlanSchema.findOne({ "_id": planId }, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('Plan Not available', null);
                });
            },
            (plan, done) => {
                plan.price = plan.price + 100;
                UserSchema.findOne({
                    "$and": [
                        { "_id": userId },
                        { "balance": { "$gt": plan.price } }
                    ]
                }, (err, res) => {
                    err ? done(err, null) : null;
                    if (res) {
                        const data = {
                            plan: plan,
                            user: res,
                            channel: []
                        };
                        done(null, data);
                    }
                    else {
                        done('Balance is not enough', null);
                    }
                });
            },
            (data, done) => {
                ChannelSchema.find({ "plans": data.plan._id }, (err, res) => {
                    err ? done(err, null) : null;
                    if (res && res.length > 0) {
                        data.channel = res;
                        done(null, data);
                    }
                    else {
                        callback(null, data);
                    }
                });
            },
            (data, done) => {
                const balance = data.user.Balance - data.plan.price;
                UserSchema.findOneAndUpdate({ "_id": data.user._id }, {
                    "$addToSet": {
                        "plans": data.plan,
                        "channels": data.channel
                    },
                    balance: balance
                }, { "new": true }, (err, res) => {
                    err ? done(err, null) : done(null, res);
                });
            }
        ], (err, result) => {
            err ? callback(err, null) : callback(null, result);
        });
    }
    addChannelByUser(userId, channelId, callback) {
        async.waterfall([
            (done) => {
                ChannelSchema.findOne({ "_id": channelId }, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('Channel Not available', null);
                });
            },
            (channel, done) => {
                channel.price = channel.price + 100;
                UserSchema.findOne({
                    "$and": [
                        { "_id": userId },
                        { "balance": { "$gt": channel.price } }
                    ]
                }, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('Balance is not enough', null);
                });
            },
            (user, done) => {
                UserSchema.findOneAndUpdate({ "_id": userId, }, { "addToSet": { "channels": channelId } }, { new: true }, (err, res) => {
                    err ? done(err, null) : done(null, res);
                });
            }
        ], (err, result) => {
            err ? callback(err, null) : callback(null, result);
        });
    }
}
Object.seal(UserRepository);
module.exports = UserRepository;
//# sourceMappingURL=UserRepository.js.map