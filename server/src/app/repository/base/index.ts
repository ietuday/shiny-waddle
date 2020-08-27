import IRead = require("../interfaces/base/Read");
import IWrite = require("../interfaces/base/Write");

import mongoose = require("mongoose");
 
class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
    
    private _model: mongoose.Model<mongoose.Document>;
    
    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    
    create (item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);
        
    }
    
    retrieve (callback: (error: any, result: any) => void) {
         this._model.find({}, callback)
    }
    
    update (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
            this._model.findOneAndUpdate({_id:_id},item,{new: true} ,callback);
            
    }
        
    delete (_id: string, callback:(error: any, result: any) => void) {
        this._model.findOneAndRemove({_id: this.toObjectId(_id)}, (err) => callback(err, null));
    } 
    
    findById (_id: string, callback: (error: any, result: T) => void) {
        this._model.findById( _id, callback);
    }
    
    
    private toObjectId (_id: string) : mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
    
}

export = RepositoryBase;