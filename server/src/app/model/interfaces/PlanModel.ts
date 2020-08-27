import mongoose = require('mongoose');

interface PlanModel extends mongoose.Document {
    _id?: string;
    name?: string;
    createdAt?: Date; 
    updatedAt?: Date;

}

export = PlanModel;