
import mongoose = require('mongoose');

import DataAccess = require('../DataAccess');
import IUserModel = require('../../model/interfaces/UserModel');
 
let Mongoose = mongoose.Schema;
const UserSchema = new Mongoose({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
    },
    salt: {
        type: String
    },
    isVerified: { 
        type: Boolean, 
        default: true 
    },
    isAdmin:{
        type: Boolean, 
        default: false  
    },
    plans: [{
        type: Mongoose.Types.ObjectId,
        ref: 'Plan'
    }],
    channels: [{
        type: Mongoose.Types.ObjectId,
        ref: 'Channel'
    }],
    balance: {
        type: Number
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now  
    },

}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}})


UserSchema.pre('save', function(next) {
    console.log('Pre Save Called');
    
    // This middleware will prevent `save()` from executing and go straight
    // to executing the error handling middleware
    // next(new Error('pre save error'));
    next();
});

UserSchema.post('save', function(doc, next) {
    console.log('Post Save Called');
    // If this hook is defined _before_ an error handler middleware, this will
    // skip all other non-error-handler post save hooks and execute the next
    // error handler middleware
    // next(new Error('post save error'));
    next();
});

  
const handleE11000 = (error, res, next) =>  {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
};

UserSchema.post('save', handleE11000);
UserSchema.post('update', handleE11000);
UserSchema.post('findOneAndUpdate', handleE11000);
UserSchema.post('insertMany', handleE11000);

let User = DataAccess.mongooseConnection.model<IUserModel>("User", UserSchema);

export = User;