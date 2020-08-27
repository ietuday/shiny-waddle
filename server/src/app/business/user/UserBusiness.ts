import crypto = require('crypto');
import async = require('async');
import jwt = require('jsonwebtoken');

import UserRepository = require('../../repository/user/UserRepository');
import IUserBusiness = require('../interfaces/UserBusiness');
import IUserModel = require('../../model/interfaces/UserModel');

interface Ihash {
    password: string;
    salt: string;
}


class UserBusiness implements IUserBusiness {
    private _UserRepository: UserRepository;

    saltLength: number = parseInt(process.env.SALT_LENGTH);

    constructor() {
        this._UserRepository = new UserRepository();
    }

    /**
     * @function create
     * @description Create a User
     * @param user 
     * @param callback 
     * @author Udayaditya Singh
     */
    create(user: IUserModel, callback: (error: any, result: any) => void) {
        const hash = this.saltHashPassword(user.password);
        user.isVerified = true;
        user.balance = 100;
        user.password = hash.password;
        user.salt = hash.salt;
        this._UserRepository.create(user, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

    /**
     * @function retrieve
     * @description Retrieve all Users
     * @param callback 
     * @author Udayaditya Singh
     */
    retrieve(callback: (error: any, result: any) => void) {
        this._UserRepository.retrieve((err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

    /**
     * @function delete a user
     * @description Delete a User
     * @param _id 
     * @param callback 
     * @author Udayaditya Singh
     */
    delete(_id:string, callback: (error: any, result: any) => void) {
        this._UserRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
     }

    /**
     * @function update
     * @description Update a User
     * @param _id 
     * @param item 
     * @param callback 
     * @author Udayaditya Singh
     */
    update(_id: string, item: IUserModel, callback: (error: any, result: any) => void) {
        this._UserRepository.update(_id,item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }

    /**
     * @function findById
     * @description find user by id
     * @param id 
     * @param callback 
     * @author Udayaditya Singh
     */
    findById(_id:string, callback: (error: any, result: any) => void) { 
        this._UserRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }

    /**
     * @function saltHashPassword
     * @description get Ihash Data
     * @param password 
     * @author Udayaditya Singh
     */
    saltHashPassword(password: string): Ihash {
        const salt: string = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    }

    /**
     * @function getSalt
     * @description get salt
     * @author Udayaditya Singh
     */
    getSalt():string {
        return crypto.randomBytes(this.saltLength).toString('hex');
    }

    /**
     * @function hashPasswordWithSalt
     * @description Hashed the password
     * @param password 
     * @param salt 
     * @author Udayaditya Singh
     */
    hashPasswordWithSalt(password: string, salt: string): Ihash {

        let hashedPassword = crypto.createHmac('sha512', salt);
        hashedPassword.update(password);
        hashedPassword = hashedPassword.digest('hex') as any;
        const encryptedValues: Ihash = {
          salt: salt,
          password: String(hashedPassword)
        };
        return encryptedValues
    
    }

    /**
     * @function login
     * @description login a user
     * @param email 
     * @param password 
     * @param callback 
     * @author Udayaditya Singh
     */
    login(email: string, password: string, callback: (error: any, result: any) => void){
        async.waterfall([
            (done) => {
              this._UserRepository.findByItem({email}, (error, result) => {
                    error ? done(error, null) : null;
                    if(result && result.isVerified){
                        const userPassword: Ihash = this.hashPasswordWithSalt(password, result.salt);
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
                        }
                        return done(null, userDetail);
                        } else {
                        return done('Wrong Password', null);
                        }
                  }else if(result && !result.isVerified){
                    done('User not verified', null)
                  }
                 else {
                  return done("User not found", null);
                }
              });
            },
            (userDetail, done) => {
              this._UserRepository.update(userDetail._id, userDetail, (error, result) => {
                  error ? done('Internal Server Error', null) : done(null, userDetail.token);
              })
            }
          ], (err, result) => {
              err ? callback(err, null) : callback(null, result);
              
          });
    }

    findByToken(token: string, callback: (error: any, result: any) => void){
        this._UserRepository.findByItem({token}, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }

    getUserDetails(user: any){
        const {_doc, ...rest} = user;
        const { password, salt, token, ...data} = _doc
        return data;
    }

    addMoney(amount: number,userId: string, callback: (error: any, result: any) => void){
        async.waterfall([
            (done) => {
                this._UserRepository.findByItem({"_id": userId}, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('User not found', null)
                })
            },
            (user, done) => {
                user.balance = user.balance + amount;
                this._UserRepository.update(userId, {"balance": user.balance},(err,res) => {
                    err ? done(err, null) : done(null, res)
                })
            }
        ], (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    }

    logout(userId: string, callback: (error: any, result: any) => void){
        const updateItem = { $unset: { token: 1 } };
        this._UserRepository.logout(userId,updateItem, (err, resp) => {
            err ? callback(err, null) : callback(null, resp)
        })
    }

    addPlanByUser(userId: string,planId:string, callback: (error: any, result: any) => void){
        this._UserRepository.checkBalance(userId,planId, (err, res) => {
            err ? callback(err, null) : callback(null, res);
           
        })
    }

    addChannelByUser(userId: string,channelId:string, callback: (error: any, result: any) => void){
        this._UserRepository.addChannelByUser(userId,channelId, (err, res) => {
            err ? callback(err, null) : callback(null, res);
           
        })
    }
   
}

Object.seal(UserBusiness);
export = UserBusiness;
