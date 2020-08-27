import mongoose = require('mongoose');

interface UserModel extends mongoose.Document {

    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    token?: string;
    salt?: string; 
    createdAt?: Date; 
    updatedAt?: Date;
    isVerified?: Boolean;
    isAdmin?:Boolean;
    plans?: Array<any>;
    channels?: Array<any>;
    balance?:Number; 
}

export = UserModel;