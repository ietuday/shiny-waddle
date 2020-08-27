import mongoose = require("mongoose");
import async = require('async');

import RepositoryBase = require('../base');
import IUserModel = require('../../model/interfaces/UserModel');
import UserSchema = require('../../dataAccess/schemas/UserSchema');
import PlanSchema = require('../../dataAccess/schemas/PlanSchema');
import ChannelSchema = require('../../dataAccess/schemas/ChannelSchema');

class UserRepository extends RepositoryBase<IUserModel>{
    constructor() {
        super(UserSchema);
    }

    findByItem(item: any, callback: (error:any, result: any) => void){
        UserSchema.findOne(item, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    }

    logout(userId: string,item: any, callback: (error: any, result:any) => void){
        UserSchema.findOneAndUpdate({ "_id": userId }, { "$unset": { "token": 1 } },  (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    }

    checkBalance(userId: string, planId:string, callback: (error: any, result:any) => void){
        async.waterfall([
            (done) => {
                PlanSchema.findOne({"_id": planId}, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('Plan Not available', null)
                })
            },
            (plan, done) => {
                plan.price = plan.price + 100;
                UserSchema.findOne({
                    "$and": [
                        { "_id": userId },
                        {"balance": {"$gt": plan.price}}
                    ]}, (err, res) => {
                        err ? done(err, null) : null;
                        if(res){
                            const data = {
                                plan : plan,
                                user: res,
                                channel: []
                            }
                            done(null, data)
                        }else{
                            done('Balance is not enough', null)
                        }
                    })
            },
            (data, done) => {
                ChannelSchema.find({"plans": data.plan._id}, (err, res) => {
                    err ? done(err, null) : null;
                    if(res && res.length > 0 ){
                        data.channel = res;
                        done(null, data)
                    }else{
                        callback(null, data)
                    }
                })
            },
            (data, done) => {
                const balance = data.user.Balance - data.plan.price;
                UserSchema.findOneAndUpdate(
                    {"_id": data.user._id},
                    {
                        "$addToSet": {
                            "plans": data.plan,
                            "channels": data.channel
                        },
                        balance: balance
                    },
                    {"new": true},
                    (err, res) => {
                        err ? done(err, null) : done(null, res)
                    })
            }
        ], (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }

    addChannelByUser(userId: string,channelId:string, callback: (error: any, result: any) => void){
        async.waterfall([
            (done) => {
                ChannelSchema.findOne({"_id": channelId}, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('Channel Not available', null)
                })
            },
            (channel, done) => {
                channel.price = channel.price + 100;
                UserSchema.findOne({
                    "$and": [
                        { "_id": userId },
                        {"balance": {"$gt": channel.price}}
                    ]}, (err, res) => {
                        err ? done(err, null) : null;
                        res ? done(null, res) : done('Balance is not enough', null)
                    })
            }, 
            (user, done) => {
                UserSchema.findOneAndUpdate({"_id": userId, {"addToSet": {"channels": channelId}}, {new: true}, (err, res) => {
                    err ? done(err, null) : done(null, res);
                })
            }

        ], (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }


}
Object.seal(UserRepository);
export = UserRepository;
    