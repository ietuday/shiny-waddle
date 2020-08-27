"use strict";
const mongoose = require("mongoose");
const DataAccess = require("../DataAccess");
let Mongoose = mongoose.Schema;
const ChannnelSchema = new Mongoose({
    name: {
        type: String,
        required: true,
        trim: true
    },
    plans: [{
            type: Mongoose.Types.ObjectId,
            ref: 'Plan'
        }],
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
ChannnelSchema.pre('save', function (next) {
    console.log('Pre Save Called');
    // This middleware will prevent `save()` from executing and go straight
    // to executing the error handling middleware
    // next(new Error('pre save error'));
    next();
});
ChannnelSchema.post('save', function (doc, next) {
    console.log('Post Save Called');
    // If this hook is defined _before_ an error handler middleware, this will
    // skip all other non-error-handler post save hooks and execute the next
    // error handler middleware
    // next(new Error('post save error'));
    next();
});
const handleE11000 = (error, res, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next();
    }
};
ChannnelSchema.post('save', handleE11000);
ChannnelSchema.post('update', handleE11000);
ChannnelSchema.post('findOneAndUpdate', handleE11000);
ChannnelSchema.post('insertMany', handleE11000);
let Channnel = DataAccess.mongooseConnection.model("Channnel", ChannnelSchema);
module.exports = Channnel;
//# sourceMappingURL=ChannelSchema.js.map