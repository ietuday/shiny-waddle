import mongoose = require('mongoose');

interface ChannelModel extends mongoose.Document {
    _id?: string;
    name?: string;
    plans?: Array<String>;
    price?: Number;
    createdAt?: Date; 
    updatedAt?: Date;

}

export = ChannelModel;